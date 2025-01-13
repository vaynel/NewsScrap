#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import io
import logging
import json
from collections import Counter
from konlpy.tag import Okt

# 파이썬 3.7+ 에서 표준 출력 UTF-8 설정
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# 로깅 설정
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

def extract_keywords(title, description):
    logging.info("extract_keywords 함수 실행")
    okt = Okt()
    text = f"{title} {description}"
    logging.debug(f"분석할 텍스트: {text}")
    
    # 1) 명사 추출
    nouns = okt.nouns(text)
    logging.debug(f"추출된 명사: {nouns}")
    
    # 2) 2글자 이상 단어만 필터링
    nouns = [noun for noun in nouns if len(noun) > 1]
    logging.debug(f"필터링된 명사 (2글자 이상): {nouns}")
    
    noun_counts = Counter(nouns)
    logging.debug(f"단어 빈도수: {noun_counts}")

    # 중요도(가중치) 계산 함수
    def calculate_importance(word):
        title_score = 2 if word in title else 0  # 타이틀 포함 여부
        length_score = len(word) * 0.5           # 단어 길이에 따른 가중
        freq_score = noun_counts[word]          # 빈도수
        return freq_score + title_score + length_score

    # 중요도 기반으로 내림차순 정렬
    sorted_nouns = sorted(noun_counts.keys(), key=calculate_importance, reverse=True)
    logging.debug(f"중요도 기반 정렬된 명사: {sorted_nouns}")
    
    # 상위 5개만 반환
    return sorted_nouns[:5]


if __name__ == "__main__":
    try:
        logging.info("Python 스크립트 시작")
        
        if len(sys.argv) < 2:
            raise ValueError("No input provided to the script")

        # Node.js에서 JSON을 첫 번째 인자로 넘긴다고 가정
        input_data = json.loads(sys.argv[1])
        logging.debug(f"입력 데이터: {input_data}")
        
        title = input_data.get("title", "")
        description = input_data.get("description", "")
        logging.debug(f"제목: {title}, 설명: {description}")

        # 둘 다 빈칸이면 빈 배열
        if not title.strip() and not description.strip():
            logging.info("제목과 설명이 비어 있음, 빈 배열 반환")
            print(json.dumps([]))
            sys.exit(0)

        keywords = extract_keywords(title, description)
        logging.info(f"파이썬임 추출된 키워드: {keywords}")
      # JSON 데이터를 stdout으로만 출력
        print(json.dumps(keywords, ensure_ascii=False))
    except json.JSONDecodeError as e:
        logging.error(f"JSONDecodeError: {str(e)}")
        print(json.dumps({"error": "Invalid JSON input"}))
        sys.exit(1)
    except Exception as e:
        logging.error(f"Unhandled Error: {str(e)}")
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

