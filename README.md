# [サービス名]
北陸支援トラベラーズマップ

## サービス概要
「北陸支援トラベラーズマップ」は、観光を通じて北陸を支援したい人と、北陸の観光業に携わる人たちの架け橋になる、北陸地方各地域の道路及び交通情報や各種観光施設の情報をマップ上にマッピング・可視化させたマップ検索サービスです。

## このサービスへの思い
「北陸支援トラベラーズマップ」という名前は、『「北陸」を「支援」する「トラベラー(旅行者)」のためのマップ』という思いからきているものです。
北陸地方は観光業が盛んな地域ですが、令和6年能登半島地震の影響で、北陸地方全体で旅行のキャンセルおよび風評被害が発生しており、既に通常の生活や営業を行っているエリアでも、旅行のキャンセルおよび風評被害で客足が戻らず、観光業に携わる人達だけではなく、地域の経済にも影響が出ています。
そういった情報がニュースや現地の人のSNSの発信などで伝えられ、『「観光」を通じて北陸を支援したい』と考える人がSNSなどの反応でもみられる中、その需要を実際に北陸地方に届けるために、このサービスを利用していただけたらと考えています。

## このサービスを作りたい理由
サービスの着想のきっかけは、ニュースで見た北陸地方の現状と、SNSの発信情報からです。
令和6年能登半島地震では、能登半島北東部を中心に大きな被害を受けたのですが、被害の程度は地域によってばらつきがあり、地震の被害が少なかった所では、既に通常営業に戻っている所もあります。
しかしながら、外部の観光客には北陸地方全体が地震によって大きな影響を受けて北陸地方へ行く事自体を自粛した方が良いと思われているためか、通常営業に戻っている地域でも客足が戻らず苦しんでいる所が多々あり(特に、石川県西部及び南部や富山県など)、ニュースのインタビューやSNSでも現地の観光施設や市の広報などが「観光に来てほしい」と発信する情報を見て、このサービスを思いつきました。

##　想定されるユーザー
・観光支援を通じて、北陸を応援したい人
・北陸へ観光に行きたいけれど、どこへなら観光に行っても良いかよく分からなくて困っている人

## サービスの利用イメージ
当サービスの分類は「マップ検索サービス」です。
サービス概要にある通り、北陸地方の観光に関する情報に特化したマップ検索サービスで、トップ画面には北陸地方全体のマップが表示されており、マップ上には北陸地方各地域の道路及び交通情報や各種観光施設の情報がマッピング・可視化されており、ユーザーはそれらの情報を参考にしながらマップ上や検索窓から気になる観光スポットや旅館を探す事が出来ます。

## サービスの差別化ポイント
「北陸支援トラベラーズマップ」が既存のマップ検索サービスと異なるのは、北陸地方の観光に特化したサービス且つ現在の北陸地方各地域の状況に基づいたマッピング・可視化情報がある事で、地震の影響で地域によって異なる状況にある北陸地方の人々に負担をかける心配なく、施設にとっては「いま来てほしい」、観光客にとっては「ゆったり観光できる観光スポットや旅館を見つける事」が視覚的に分かりやすく表示できるサービスである事です。

## 機能候補
■ MVPリリース
・北陸地方全体のマップ表示
→マップ上に北陸地方各地域の道路及び交通情報や各種観光施設の情報をマッピング・可視化
→マッピング・可視化する情報の量は、マップの拡大・縮小に応じて変化
↓可視化する情報↓
1.その県及び地域の主要な観光施設
2.道路及び交通情報 (現在渋滞、混雑、交通規制がかかっている道や鉄道を色分けして表示)
→使用技術としてGoogle Maps Platformの「TrafficLayer」と「TransitLayer」を使用
・マップ検索機能

・ユーザー登録
・ログイン・ログアウト機能
※以下ユーザー登録・ログイン・ログアウトに関連・付随する機能
・ユーザー登録に必要な情報↓
 ・メールアドレス
 ・ユーザー名
 ・パスワード
・プロフィール編集機能↓
 ・メールアドレス
 ・ユーザー名
 ・プロフィール(自己紹介)
 ・パスワードリセット

■ 本リリース
・観光地のカテゴリ別検索機能

## 使用技術
■ 開発環境: Docker
■ バックエンド:
・Ruby on Rails 7 (メインフレームワーク)
・PostgreSQL (データベース)
■ フロントエンド: HotWire
■ WebAPI: 
・Google Maps Platformを使い、以下のAPIを使用↓
・Maps JavaScript API (マップ機能、「TrafficLayer」「TransitLayer」による交通情報の表示)
・Google Places API (検索機能と検索によって得られた地点の詳細情報の取得)
■ 認証:
・Devise(Ruby on Railsでの認証を処理)
■ インフラ: 
・Webアプリケーションサーバ: heroku
・データベースサーバ: PostgreSQL
■ バージョン管理システム(VCS)：GitHub

## 機能の実装方針予定
Ruby on Railsを使って行います。