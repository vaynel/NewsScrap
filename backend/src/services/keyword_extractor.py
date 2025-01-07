#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import io

# 파이썬 3.7+ 에서 표준 출력 UTF-8 설정
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

import json
from collections import Counter
from konlpy.tag import Okt


def extract_keywords(title, description):
    okt = Okt()
    text = f"{title} {description}"
    
    # 1) 명사 추출
    nouns = okt.nouns(text)
    # 2) 2글자 이상 단어만 필터링
    nouns = [noun for noun in nouns if len(noun) > 1]
    
    noun_counts = Counter(nouns)

    # 중요도(가중치) 계산 함수
    def calculate_importance(word):
        title_score = 2 if word in title else 0  # 타이틀 포함 여부
        length_score = len(word) * 0.5           # 단어 길이에 따른 가중
        freq_score = noun_counts[word]          # 빈도수
        return freq_score + title_score + length_score

    # 중요도 기반으로 내림차순 정렬
    sorted_nouns = sorted(noun_counts.keys(), key=calculate_importance, reverse=True)
    # 상위 5개만 반환
    return sorted_nouns[:5]


if __name__ == "__main__":
    try:
        # Node.js에서 JSON을 첫 번째 인자로 넘긴다고 가정
        input_data = json.loads(sys.argv[1])
        title = input_data.get("title", "")
        description = input_data.get("description", "")

        # 둘 다 빈칸이면 빈 배열
        if not title.strip() and not description.strip():
            print(json.dumps([]))
            sys.exit(0)

        keywords = extract_keywords(title, description)
        # ensure_ascii=False: 한글이 깨지지 않도록
        print(json.dumps(keywords, ensure_ascii=False))
    except json.JSONDecodeError as e:
        print(f"JSONDecodeError: {str(e)}")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)
