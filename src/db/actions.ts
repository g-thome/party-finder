import Grupo from './models/Grupo';
import IGrupo from '../interfaces/IGrupo';

async function saveGrupo(grupo: IGrupo) {
  const doc = new Grupo(grupo);
  await doc.save();
}

async function getGruposByMember(member: string): Promise<IGrupo[]> {
  const doc = await Grupo.find({ members: member });
  return doc;
}

export { saveGrupo, getGruposByMember };
