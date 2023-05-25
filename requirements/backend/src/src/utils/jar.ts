import { CookieJar } from 'tough-cookie';
import { promisify } from 'util';

let jar: CookieJar;

export const getCookieJar = async () => {
  if (!jar) {
      jar = new CookieJar();
      const setCookie = promisify(jar.setCookie.bind(jar))
      await setCookie(process.env.COOKIE??"", 'https://osu.ppy.sh')
  }
  return jar
}