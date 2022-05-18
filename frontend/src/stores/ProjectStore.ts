import { makeAutoObservable } from 'mobx';
import Locations from '../constants/locations';
import Project from '../model/Project';
import Tile from '../model/Tile';
import type { RootStore } from './RootStore';

class ProjectStore {
  allProjects: Array<Project>;
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.allProjects = [];
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  addNewProject(location: Locations, tile?: Tile) {
    const newProject = new Project(location, tile);
    this.allProjects.push(newProject);

    return newProject;
  }

  getAvailableProjects(tile: Tile): Project[] | undefined {
    return this.allProjects.filter((project) => project.tiles.includes(tile) && project.meeples.length === 0);
  }
}
export default ProjectStore;
