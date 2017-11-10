import OpenSecretsCall from '../../opensecrets-api';
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
      const legislators = data.response.legislator;
      const legislatorKeys = legislators.map((legislator) => {
        return `legislators:${legislator["@attributes"].cid}`;
      });
      const legisArray = legislators.map((legislator) => {
        const item = {
          cid: legislator["@attributes"].cid,
          firstlast: legislator["@attributes"].firstlast,
          party: legislator["@attributes"].party,
          gender: legislator["@attributes"].gender,
          elected: legislator["@attributes"].first_elected,
          twitterID: legislator["@attributes"].twitter_id,
          congressoffice: legislator["@attributes"].congress_office,
          birthdate: legislator["@attributes"].birthdate
        };
        return item;
      });
      const result = [legislatorKeys, legisArray];
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    });
});

export { getLegislators };
