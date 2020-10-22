import Grupo from './models/Grupo';
import IGrupo from '../interfaces/IGrupo';

async function saveGrupo(grupo: IGrupo): Promise<IGrupo|null> {
  try {
    const doc = new Grupo(grupo);
    return await doc.save();
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

async function getGruposByMember(member: string): Promise<IGrupo[]|null> {
  try {
    const doc = await Grupo.find(member);
    return doc;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

export { saveGrupo, getGruposByMember };
