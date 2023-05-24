import fs from 'fs';
import { v4 as uuid } from 'uuid';

import ChecksData from './db/check-table.json';
import ProjectsData from './db/project-table.json';
import SkillsData from './db/skill-table.json';
import UsersData from './db/user-table.json';

/**
 * This class serves as an example of a data source that will be passed to the context.
 * 
 * When we create our Apollo Server instance we can pass a context containing anything that needs
 * to be accessible in the resolvers (e.g. DB connections, logged user data for auth, etc.).
 * 
 * This sample class is used in our index.ts file to create an instance of JsonDataSource. This
 * instance can later be used in the queries.ts, mutations.ts and resolvers.ts files to access our
 * data sources.
 * 
 * Anything added to the context is available to all resolvers. It creates a new instance for every
 * request.
 */
export class JsonDataSource {
  private dataFile;
  private dataSet;

  /**
   * Create an instance of JsonDataSource.
   * 
   * In practice, this constructor would be doing something like instantiating a DB connection if
   * we're trying to read from one. Or maybe getting some API secret key to read from a third-party
   * API.
   * 
   * Basically any configuration needed to use our data source.
   *
   * @param dataSetName Name of the set from which we'll get the data.
   *
   * @returns A new instance of JsonDataSource.
   */
  constructor(dataSetName: 'checks' | 'projects' | 'skills' | 'users') {
    switch (dataSetName) {
      case 'checks':
        this.dataFile = 'src/db/check-table.json';
        this.dataSet = ChecksData;
        return;
      case 'projects':
        this.dataFile = 'src/db/project-table.json';
        this.dataSet = ProjectsData;
        return;
      case 'skills':
        this.dataFile = 'src/db/skill-table.json';
        this.dataSet = SkillsData;
        return;
      case 'users':
        this.dataFile = 'src/db/user-table.json';
        this.dataSet = UsersData;
        return;
    }
  }

  /**
   * Creates a new element in the data set of the current instance.
   *
   * @param newElementData Data of the element to create.
   *
   * @returns The element created with its assigned Id.
   */
  create = (newElementData: any) => {
    const newElementId = uuid();
    const newElement = {
      ...newElementData,
      id: newElementId,
    };

    this.dataSet.push(newElement);

    fs.writeFile(
      this.dataFile,
      JSON.stringify(this.dataSet, null, 2),
      { flag: 'w' },
      (error) => { if (error) return console.error(error) },
    );

    return newElement;
  }

  /**
   * Reads filtered data from the data set of the current instance.
   *
   * @param filters Filters to apply to the data set.
   *
   * @returns The filtered results.
   */
  read = (filters?: Record<string, string>) => {
    let result = this.dataSet;

    if (filters) {
      Object.entries(filters).forEach(([filter, value]) => {
        if (value) {
          result = this.dataSet.filter(element => element[filter] === value);
        }
      });
    }

    return result;
  }

  /**
   * Updates an existing element in the data set of the current instance.
   *
   * @param newElement Data of the element to update.
   *
   * @returns The element updated.
   */
  update = (editedElement: any) => {
    const elementIndex = this.dataSet.findIndex(element => element.id === editedElement.id);

    if (elementIndex === -1) {
      throw Error('Element does not exist');
    }

    this.dataSet[elementIndex] = editedElement;

    fs.writeFile(
      this.dataFile,
      JSON.stringify(this.dataSet, null, 2),
      { flag: 'w' },
      (error) => { if (error) return console.error(error) },
    );

    return editedElement;
  }

  /**
   * Deletes an existing element in the data set of the current instance.
   *
   * @param deletedElementId Id of the element to delete.
   *
   * @returns The element deleted.
   */
  delete = (deletedElementId: string) => {
    const elementIndex = this.dataSet.findIndex(element => element.id === deletedElementId);

    if (elementIndex === -1) {
      throw Error('Element does not exist');
    }

    const deletedElement = this.dataSet.splice(elementIndex, 1)[0];

    fs.writeFile(
      this.dataFile,
      JSON.stringify(this.dataSet, null, 2),
      { flag: 'w' },
      (error) => { if (error) return console.error(error) },
    );

    return deletedElement;
  }
}
