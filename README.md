# [サービス名]
北陸支援トラベラーズMap

## サービス概要

「北陸支援トラベラーズMap」は、観光を通じて北陸を支援したい人と、北陸の観光業に携わる人たちの架け橋になる、北陸地方各地域の道路及び交通情報や各種観光施設の情報をマップ上にマッピング・可視化させたマップ検索サービスです。

## このサービスへの思い
「北陸支援トラベラーズMap」という名前は、『「北陸」を「支援」する「トラベラー(旅行者)」のための「Map」』という思いからきているものです。
北陸地方は観光業が盛んな地域ですが、令和6年能登半島地震の影響で、北陸地方全体で旅行のキャンセルおよび風評被害が発生しており、既に通常の生活や営業を行っているエリアでも、旅行のキャンセルおよび風評被害で客足が戻らず、観光業に携わる人達だけではなく、地域の経済にも影響が出ています。
そういった情報がニュースや現地の人のSNSの発信などで伝えられ、『「観光」を通じて北陸を支援したい』と考える人がSNSなどの反応でもみられる中、その需要を実際に北陸地方に届けるために、このサービスを利用していただけたらと考えています。

## このサービスを作りたい理由

サービスの着想のきっかけは、ニュースで見た北陸地方の現状と、SNSの発信情報からです。
令和6年能登半島地震では、能登半島北東部を中心に大きな被害を受けたのですが、被害の程度は地域によってばらつきがあり、地震の被害が少なかった所では、既に通常営業に戻っている所もあります。
しかしながら、外部の観光客には北陸地方全体が地震によって大きな影響を受けて北陸地方へ行く事自体を自粛した方が良いと思われているためか、通常営業に戻っている地域でも客足が戻らず苦しんでいる所が多々あり(特に、石川県西部及び南部や富山県など)、ニュースのインタビューやSNSでも現地の観光施設や市の広報などが「観光に来てほしい」と発信する情報を見て、このサービスを思いつきました。

##　想定されるユーザー

・観光支援を通じて、北陸を応援したい人
・北陸へ観光に行きたいけれど、どこへなら観光に行っても良いかよく分からなくて困っている人
・観光客の多くない地域や場所を選んで、ゆったりと観光したい人

## サービスの利用イメージ

当サービスの分類は「マップ検索サービス」です。
サービス概要にある通り、北陸地方の観光に関する情報に特化したマップ検索サービスで、トップ画面には北陸地方全体のマップが表示されており、マップ上には北陸地方各地域の道路及び交通情報や各種観光施設の情報がマッピング・可視化されており、ユーザーはそれらの情報を参考にしながらマップ上や検索窓から気になる観光スポットや旅館を探す事が出来ます。
また、このサービスにはレビュー機能があるため、ユーザー登録してログインした場合、実際に行った観光スポットや旅館についてのレビュー投稿が行えます。

## サービスの差別化ポイント

「北陸支援トラベラーズMap」が既存のマップ検索サービスと異なるのは、北陸地方の観光に特化したサービス且つ現在の北陸地方各地域の状況に基づいたマッピング・可視化情報がある事で、地震の影響で地域によって異なる状況にある北陸地方の人々に負担をかける心配なく、施設にとっては「いま来てほしい」、観光客にとっては「ゆったり観光できる観光スポットや旅館を見つける事」が視覚的に分かりやすく表示できるサービスである事です。
『施設にとって「いま来てほしい」』事をサービスに反映する手段として、
レコメンド機能で、可視化情報(各種施設のピン留め表示、道路及び交通情報・施設や周辺エリアの混雑度など)も基にしつつ、敢えて「混雑度の低い施設及びその周辺のエリア」を優先的に表示させる事で、特定の観光施設やエリアへの観光客の集中を抑え、「いま来てほしい」と考えている北陸地方全ての観光施設の思いにできる限り答えたいと考えています。


## 機能候補

■ MVPリリース時
・北陸地方全体のマップ表示
→マップ上に北陸地方各地域の道路及び交通情報や各種観光施設の情報をマッピング・可視化
可視化する情報↓
マップ上に常に表示↓
・道路及び交通情報→現在渋滞、混雑、交通規制がかかっている道や鉄道を色分けして表示
→使用技術としてGoogle Maps Platformの「TrafficLayer」と「TransitLayer」を使用
・以下の地点をマップ上にピン留め表示↓
その県及び地域の主要な観光施設
検索回数上位の観光施設
レビュー投稿・削除機能といいね機能実装後はレビューに「いいね」が多かった観光施設

→マッピング・可視化する情報の量は、マップの拡大・縮小に応じて変化
・マップを県や地域でブロックに分け、特定の県や地域が指定されたマップ表示
・マップ検索機能
→観光スポットや旅館などを、マッピング・可視化情報から検索したり、検索窓から検索する機能
・地域やカテゴリ、ジャンルによる絞り込み検索機能
・レコメンド機能
→お気に入りリストや現在のマッピング・可視化情報を基におすすめの観光施設や旅館を表示する機能
→上記の情報を基にしつつも、敢えて「混雑度の低い施設及びその周辺のエリア」を優先的に表示させるアルゴリズムを搭載
・お気に入りリスト
→気になった観光スポットや旅館などを一時保存する機能

・ユーザー登録
・ログイン・ログアウト機能
※以下ユーザー登録・ログイン・ログアウトに関連・付随する機能
・ユーザー登録に必要な情報↓
 ・メールアドレス
 ・ニックネーム
 ・パスワード
・プロフィール編集機能↓
 ・メールアドレス
 ・ニックネーム
 ・パスワードリセット
・レビュー投稿・削除機能 (レビュー投稿には画像投稿も可)
・いいね機能

## 使用技術

■ 開発環境: Docker
■ バックエンド:
・Ruby on Rails 7 (メインフレームワーク)
・PostgreSQL (データベース)
■ フロントエンド: HotWire
■ CSSフレームワーク: bootstrap 5
■ Rails gem:
・CarrierWave (画像投稿用)
・Stimulus Autocomplete(オートコンプリート)
■ WebAPI: 
・Google Maps Platform (地図・道路及び交通情報・各種観光施設及びその周辺のエリアの営業情報や混雑度の情報・サイトリンクの表示及び取得)
・Google Places API(マップ上にピン留め表示する「その県及び地域の主要な観光施設」のデータ収集)
・GCP Recommendations AI (レコメンド機能用)
■ 認証:
・Devise(Ruby on Railsでの認証を処理)
■ インフラ: 
・Webアプリケーションサーバ: Fly.io
・ファイルサーバ: AWS S3
・データベースサーバ: PostgreSQL（Fly Postgres）
■ バージョン管理システム(VCS)：GitHub

## 機能の実装方針予定

Ruby on Railsを使って行います。