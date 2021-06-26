# Myself Commend Line Tools

- A commend line tool for [https://myself-bbs.com/portal.php](https://myself-bbs.com/portal.php)
- Current only test under macOS
- After running `npm install`, add `myself-cli.sh` to your path

```fish

  使用方式: myself-cli -o --on-air 取得連載新番列表
                      -l --list [ID] 取得該番劇集列表
                      -p --play [ID] [編號] 播放該番該集(需要安裝IINA)
                      -d --download [ID] [編號] 下載該番該集(需要安裝youtube-dl)
                      -a --all 自離線資料庫顯示已完結番組，列表非常之長，可利用 grep 進行搜尋
                      --update-db 更新離線資料庫(將爬取所有已完結番組資料，需要一段時間)
                      -h --help 顯示說明

  使用範例: myself-cli -o
           myself-cli -l 44583
           myself-cli -p 44583 001
           myself-cli -a | grep 關鍵字

```

## Requirements

- [IINA](https://iina.io/)

  ```fish
  brew install iina
  ```

- NodeJS

  ```fish
  brew install node
  ```

- ffmpeg

  ```fish
  brew install ffmpeg
  ```

- youtube-dl

  ```fish
  brew install youtube-dl
  ```
