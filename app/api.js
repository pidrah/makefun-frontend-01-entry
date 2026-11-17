const API='https://make.fun/api';
const memory=new Map();
export async function get(path){
  const key=API+path, old=memory.get(key), headers={Accept:'application/json'};
  if(old?.etag) headers['If-None-Match']=old.etag;
  const res=await fetch(key,{headers,cache:'no-cache'});
  if(res.status===304&&old) return old.data;
  if(!res.ok) throw new Error(`make.fun returned ${res.status}`);
  const data=await res.json(); memory.set(key,{data,etag:res.headers.get('ETag')||''}); return data;
}
export const getBoard=()=>get('/competitions?status=open&activity=times');
export const getBounty=s=>get(`/competitions/${encodeURIComponent(s)}`);
export const getLeaderboard=s=>get(`/competitions/${encodeURIComponent(s)}/leaderboard`);
export const getProfile=h=>get(`/profiles/${encodeURIComponent(h)}`);
