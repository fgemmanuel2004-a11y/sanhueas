const State={
MENU:'menu',
PLAYING:'playing',
PAUSE:'pause',
current:'menu',
set(s){this.current=s;console.log('Estado:',s);}
};