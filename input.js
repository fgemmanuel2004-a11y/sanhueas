const Input={keys:{}};
addEventListener('keydown',e=>Input.keys[e.key.toLowerCase()]=true);
addEventListener('keyup',e=>Input.keys[e.key.toLowerCase()]=false);
