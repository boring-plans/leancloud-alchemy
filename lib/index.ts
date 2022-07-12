import * as AV from "leancloud-storage";
import { Columns } from './index.d';

const createRow = (table: string, columns: Columns) => {
  const row = new (AV.Object.extend(table))();
  Object.keys(columns).forEach((k) => {
    row.set(k, columns[k]);
  });
  return row.save();
};

const createRows = (table: string, rows: Columns[]) => {
  return AV.Object.saveAll(
    rows.map((columns) => {
      const row = new (AV.Object.extend(table))();
      Object.keys(columns).forEach((k) => {
        row.set(k, columns[k]);
      });
      return row;
    })
  );
};

const updateRow = (table: string, id: string, columns: Columns) => {
  const row = AV.Object.createWithoutData(table, id);
  Object.keys(columns).forEach((k) => {
    row.set(k, columns[k]);
  });
  return row.save();
};

const updateRows = (table: string, idColumnsList: Array<[string, Columns]>) => {
  AV.Object.saveAll(
    idColumnsList.map(([id, columns]) => {
      const row = AV.Object.createWithoutData(table, id);
      Object.keys(columns).forEach((k) => {
        row.set(k, columns[k]);
      });
      return row;
    })
  );
};

const getRow = (table: string, id: string) => {
  try {
    return new AV.Query(table).get(id);
  } catch {
    return Promise.resolve(null);
  }
};

const getRows = (table: string, ids: string[]) => {
  try {
    return new AV.Query(table).containedIn("objectId", ids).find();
  } catch {
    return Promise.resolve([]);
  }
};

const getRowsBy = (table: string, key: string | [string, string][], value: string='') => {
  try {
    let keyValueList: [string, string][];
    if (key instanceof Array) {
      keyValueList = key;
    } else {
      keyValueList = [[key, value]];
    }

    return AV.Query.and(
      ...keyValueList.map(([key, value]) => {
        const query = new AV.Query(table);
        query.equalTo(key, value);
        return query;
      })
    ).find();
  } catch {
    return Promise.resolve([]);
  }
};

const getRowsContainedIn = (table: string, key: string | [string, string[]][], values: string[]=[]) => {
  try {
    let keyValuesList: [string, string[]][];
    if (key instanceof Array) {
      keyValuesList = key;
    } else {
      keyValuesList = [[key, values]];
    }

    return AV.Query.and(
      ...keyValuesList.map(([k, vs]) => {
        const query = new AV.Query(table);
        query.containedIn(k, vs);
        return query;
      })
    ).find();
  } catch {
    return Promise.resolve([]);
  }
};

const getSomeRows = (table: string, num: number, sortBy:string|null=null, desc=false) => {
  try {
    const query = new AV.Query(table).limit(num);
    return sortBy?desc?query.descending(sortBy).find(): query.ascending(sortBy).find():query.find();
  } catch {
    return Promise.resolve([]);
  }
}

const deleteRow = (table: string, id: string) => {
  const row = AV.Object.createWithoutData(table, id);
  row.destroy();
};

const deleteRows = async (table: string, ids: string[]) => {
  const rows = await getRows(table, ids) as AV.Object[];
  AV.Object.destroyAll(rows);
};

const deleteRowsBy = async (table: string, key: string | [string, string][], value: string='') => {
  const rows = await getRowsBy(table, key, value)  as AV.Object[];
  AV.Object.destroyAll(rows);
};

const deleteRowsContainedIn = async (table: string, key: string | [string, string[]][], values: string[]=[]) => {
  const rows = await getRowsContainedIn(table, key, values) as AV.Object[];
  AV.Object.destroyAll(rows);
};

const initAV = (appId: string, appKey: string) => {
  if (!AV.applicationId) {
    try {
      AV.init({ appId, appKey });

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(!!AV.applicationId);
        }, 2000);
      });
    } catch (err) {
      return new Promise((resolve) => {
        resolve(err);
      });
    }
  }

  return new Promise((resolve) => {
    resolve(true);
  });
};

export default {
  createRow,
  createRows,
  getRow,
  getRows,
  getRowsBy,
  getSomeRows,
  getRowsContainedIn,
  updateRow,
  updateRows,
  deleteRow,
  deleteRows,
  deleteRowsBy,
  deleteRowsContainedIn,
  initAV,
};
