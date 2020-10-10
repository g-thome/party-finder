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

async function getGruposByMember(member: string) {
  if (!config.APIEndpoint) { return null; }

  try {
    const result = axios.get(config.APIEndpoint, {
      params: { members: member },
    });

    return result;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

export { saveGrupo, getGruposByMember };
