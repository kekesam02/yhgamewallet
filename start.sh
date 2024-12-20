ps -ef | grep yhgame | grep -v grep | cut -c 9-15 | xargs kill -9
npm run dev