import { Toast } from 'utils';
import { projectsAction } from './genre.slices';

// export const getAll =
//   (skip: number = 0, params: IProjectWhereInput = {}) =>
//   (dispatch: any) => {
//     return getAllProjects(skip, params)
//       .then((res) => {
//         dispatch(setLoading(false));
//         dispatch(setProjects(res.count, res.data));
//       })
//       .catch((e) => {
//         Toast.error(e);
//       });
//   };

// export const setProjects =
//   (count: number = 0, projects: IProject[] = []) =>
//   (dispatch: any) => {
//     return dispatch(
//       projectsAction.setProjects({
//         projects,
//         count,
//       }),
//     );
//   };

// export const getOne = (id: number) => (dispatch: any) => {
//   return getOneService(id, 'project')
//     .then((project) => {
//       dispatch(setProject(project));
//       dispatch(setLoading(false));
//     })
//     .catch((e) => {
//       Toast.error(e);
//     });
// };

// export const setProject =
//   (project: IProject | null = null) =>
//   (dispatch: any) => {
//     return dispatch(
//       projectsAction.setProject({
//         project,
//       }),
//     );
//   };
