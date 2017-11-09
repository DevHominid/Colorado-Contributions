/**
 * Fetch legislators by id
 *
 * @param  {Object} id
 * @return {Promise<Object>}
 */

const getLegislators = (id) => new Promise((resolve, reject) => {
  const apiCall = new OpenSecretsCall('getLegislators', id);
  apiCall.fetchData()
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});

export { getLegislators };
