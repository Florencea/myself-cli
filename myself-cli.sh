#! /bin/bash

print_error() {
  COLOR_RED='\033[0;31m'
  COLOR_NORMAL='\033[0m'
  ERROR_MSG=$1
  echo ""
  echo "${COLOR_RED}錯誤：${ERROR_MSG}${COLOR_NORMAL}"
  echo ""
  exit 0
}

print_help() {
  echo ""
  echo "使用方式: myself-cli -o --on-air 取得連載新番列表"
  echo "                     -l --list [ID] 取得該番劇集列表"
  echo "                     -p --play [ID] [編號] 播放該番該集(需要安裝IINA)"
  echo "                     -d --download [ID] [編號] 下載該番該集(需要安裝youtube-dl)"
  echo "                     -a --all 自離線資料庫顯示已完結番組，列表非常之長，可利用 grep 進行搜尋"
  echo "                     --update-db 更新離線資料庫(將爬取所有已完結番組資料，需要一段時間)"
  echo "                     -h --help 顯示說明"
  echo ""
  echo "使用範例: myself-cli -o"
  echo "          myself-cli -l 44583"
  echo "          myself-cli -p 44583 001"
  echo "          myself-cli -a | grep 關鍵字"
  echo ""
}

get_all_list() {
  WORKDIR=$(dirname "$0")
  node "$WORKDIR/getAllListCli"
}

get_on_air_list() {
  WORKDIR=$(dirname "$0")
  node "$WORKDIR/getOnAirListCli"
}

get_playlist() {
  WORKDIR=$(dirname "$0")
  node "$WORKDIR//getPlaylistCli" "$1"
}

play_video() {
  WORKDIR=$(dirname "$0")
  node "$WORKDIR//playVideoCli" "$1" "$2"
}

download_video() {
  WORKDIR=$(dirname "$0")
  node "$WORKDIR//downloadVideoCli" "$1" "$2"
}

update_db() {
  WORKDIR=$(dirname "$0")
  node "$WORKDIR/crawler"
  mv "$WORKDIR/db_new.json" "$WORKDIR/db.json"
}

if [[ $# -eq 0 ]]; then
  print_help
else
  case "$1" in
  --update-db)
    if [[ $# -eq 1 ]]; then
      update_db
    else
      print_error "參數數量錯誤，請使用 myself-cli -h 觀看範例"
    fi
    ;;
  -o | --on-air)
    if [[ $# -eq 1 ]]; then
      get_on_air_list
    else
      print_error "參數數量錯誤，請使用 myself-cli -h 觀看範例"
    fi
    ;;
  -l | --list)
    if [[ $# -eq 2 ]]; then
      get_playlist "$2"
    else
      print_error "參數數量錯誤，請使用 myself-cli -h 觀看範例"
    fi
    ;;
  -p | --play)
    if [[ $# -eq 3 ]]; then
      play_video "$2" "$3"
    else
      print_error "參數數量錯誤，請使用 myself-cli -h 觀看範例"
    fi
    ;;
  -d | --download)
    if [[ $# -eq 3 ]]; then
      download_video "$2" "$3"
    else
      print_error "參數數量錯誤，請使用 myself-cli -h 觀看範例"
    fi
    ;;
  -a | --all)
    if [[ $# -eq 1 ]]; then
      get_all_list
    else
      print_error "參數數量錯誤，請使用 myself-cli -h 觀看範例"
    fi
    ;;
  -h | --help)
    if [[ $# -eq 1 ]]; then
      print_help
    else
      print_error "參數數量錯誤，請使用 myself-cli -h 觀看範例"
    fi
    ;;
  *)
    print_help
    ;;
  esac
fi
