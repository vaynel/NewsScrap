#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import json
import logging
from collections import Counter
from konlpy.tag import Okt

# 로깅은 stderr로만
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(message)s",
    stream=sys.stderr
)

def extract_keywords(title, description):
    logging.info("extract_keywords 함수 실행")
    okt = Okt()
    text = f"{title} {description}"
    logging.debug(f"분석할 텍스트: {text}")
    
    # 명사 추출
    nouns = okt.nouns(text)
    logging.debug(f"추출된 명사: {nouns}")
    
    # 2글자 이상만 필터링
    nouns = [noun for noun in nouns if len(noun) > 1]
    logging.debug(f"필터링된 명사(2글자 이상): {nouns}")
    
    # 빈도수
    counter = Counter(nouns)
    logging.debug(f"단어 빈도수: {counter}")

    def calculate_importance(word):
        title_score = 2 if word in title else 0
        length_score = len(word) * 0.5
        freq_score = counter[word]
        return freq_score + title_score + length_score

    # 중요도 순 정렬
    sorted_nouns = sorted(counter.keys(), key=calculate_importance, reverse=True)
    logging.debug(f"중요도 기반 정렬된 명사: {sorted_nouns}")
    
    return sorted_nouns[:5]


def main():
    try:
        logging.info("Python 스크립트 시작")
        # Node.js에서 stdin으로 JSON을 받음
        raw_input = sys.stdin.read().strip()
        if not raw_input:
            raise ValueError("No input provided via stdin")

        input_data = json.loads(raw_input)
        title = input_data.get("title", "")
        description = input_data.get("description", "")

        if not title.strip() and not description.strip():
            logging.info("제목과 설명이 비어 있음, 빈 배열 반환")
            print(json.dumps([]))
            return

        keywords = extract_keywords(title, description)
        logging.info(f"추출된 키워드: {keywords}")
        
        # JSON만 stdout으로 출력
        print(json.dumps(keywords, ensure_ascii=False))

    except json.JSONDecodeError as e:
        logging.error(f"JSONDecodeError: {str(e)}")
        print(json.dumps({"error": "Invalid JSON input"}))
        sys.exit(1)
    except Exception as e:
        logging.error(f"Unhandled Error: {str(e)}")
        print(json.dumps({"error": str(e)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
