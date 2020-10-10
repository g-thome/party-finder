import axios from 'axios';
import config from './config';
import Grupo from './interfaces/APIGrupo';

async function saveGrupo(grupo: Grupo) {
  if (!config.APIEndpoint) { return null; }

  try {
    const result = axios.post(config.APIEndpoint, grupo);
    return result;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

async function getGruposByMember(member: string): Promise<Grupo[]|null> {
  if (!config.APIEndpoint) { return null; }

  try {
    const result = await axios.get(config.APIEndpoint, {
      params: { members: member },
    });

    return result.data;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

export { saveGrupo, getGruposByMember };
