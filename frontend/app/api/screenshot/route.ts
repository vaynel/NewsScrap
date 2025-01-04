import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { Cluster } from 'puppeteer-cluster';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 },
    );
  }

  try {
    const decodedUrl = decodeURIComponent(url);
    const hash = crypto.createHash('sha256').update(decodedUrl).digest('hex');
    const fileName = `${hash}.png`;
    const screenshotPath = path.join(process.cwd(), 'public', 'screenshots');
    const filePath = path.join(screenshotPath, fileName);

    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { screenshotUrl: `/screenshots/${fileName}` },
        { status: 200 },
      );
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.goto(decodedUrl, { waitUntil: 'networkidle2' });

    const pageHeight = Math.min(
      await page.evaluate(() => document.documentElement.scrollHeight),
      3000,
    );

    await page.setViewport({
      width: 1280,
      height: pageHeight,
    });

    if (!fs.existsSync(screenshotPath)) {
      fs.mkdirSync(screenshotPath, { recursive: true });
    }

    const buffer = await page.screenshot({ fullPage: true });
    await fs.promises.writeFile(filePath, buffer);
    await browser.close();

    return NextResponse.json(
      { screenshotUrl: `/screenshots/${fileName}` },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    return NextResponse.json(
      { error: 'Failed to capture screenshot' },
      { status: 500 },
    );
  }
}
