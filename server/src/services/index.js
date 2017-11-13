import OpenSecretsCall from '../../opensecrets-api';

/**
 * Fetch legislators from API by id
 *
 * @param  {Object} id
 * @return {Promise<Array>}
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

/**
 * Fetch candidate industries from API by cid and cycle
 *
 * @param  {String} cid
 * @param  {String} cycle (optional) (2012, 2014, 2016, 2018)
 * @return {Promise<Object>}
 */

 const getCandIndustry = (cid, cycle) => new Promise((resolve, reject) => {
   const apiCall = new OpenSecretsCall('candIndustry', { 'cid': cid, 'cycle': cycle });
   apiCall.fetchData()
     .then((data) => {
       const candInd = data.response.industries;
       const industries = candInd.industry;
       const candInfo = {
         name: candInd["@attributes"].cand_name,
         cid: candInd["@attributes"].cid,
         cycle: candInd["@attributes"].cycle,
         source: candInd["@attributes"].source,
         lastUpdated: candInd["@attributes"].last_updated
       };
       const industryArray = industries.map((industry) => {
         const item = {
           code: industry["@attributes"].industry_code,
           name: industry["@attributes"].industry_name,
           indivs: industry["@attributes"].indivs,
           pacs: industry["@attributes"].pacs,
           total: industry["@attributes"].total
         };
         return item;
       });
       const result = [candInfo, industryArray];
       resolve(result);
     })
     .catch((err) => {
       reject(err);
     });
 });

export { getLegislators, getCandIndustry };
