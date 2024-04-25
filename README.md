# Seacret-Bear
# name
Seacret Bear

## Overview
専用の公式LINEアカウント上において、送信した文字列を独自の暗号化アルゴリズムで暗号化し、Messaging APIを用いて暗号化した文字列を返してくれるLINEbot
コードはGAS上で動かす

## Requirement
-MacOS, Windows
-GAS
-LINE Developers

## Usage
LINE Developersで専用の公式アカウントにGASのコードをインポートする。その後、チャットで送りたい文字列を送信するだけ。

## Features
文字列を暗号化するアルゴリズムを独自で作成した。
英数字(大文字、小文字)や記号、ひらがな・カタカナ(濁点、半濁点、促音)は予め決められた変換ロジック、漢字は文字数が多すぎるためランダムで変換するようになっている。その際に漢字のUnicodeコードポイントを16進数に変換する仕組みとなっている。
