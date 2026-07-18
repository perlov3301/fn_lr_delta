class Fetch_array {
    static m_array() {
      const myurls= [
        'https://jsonplaceholder.typicode.com/todos/1',
        'https://jsonplaceholder.typicode.com/todos/2',
        'https://jsonplaceholder.typicode.com/todos/3'
      ];
        return myurls;
    }
// static async is the only valid syntax
    static async fetch_all(urlArray) {
      try {
// 1. map URLs to  an array of promises of fetches
        const fetchPromises= urlArray.map(url=> fetch(url));
        const fetchPromises1= urlArray.map(url=> fetch(url));
// 2. wait for all network requests to complete in parallel
        const responses = await Promise.all(fetchPromises);
        const responses1= await Promise.all(fetchPromises1);
// 3. map responses to json parsing promises and wait for them
        const data = await Promise.all(responses.map(res=> {
          if (!res.ok) throw new Error (`http error; status: ${res.status}`);
          return res.json();
        }));
        const data1= await Promise.all(responses1.map(res=> {
          if (!res.ok) throw new Error (`http error; status: ${res.status}`);
          return res.json();
        }));
        console.log('all data fetched successfully:', data);
        return data; // returns an array of parsed objects
      }
      catch (error) { 
        console.error('One or more fetches failed:', error); 
      }
    }
    static async fetchData(url) {
      const response = await fetch(url);
      return response.json();
    }
    static async fetchData1(url) {
      const res= await fetch(url);
      if (!res.ok) throw new Error(`error; status:${res.status}`);
      return res.json();
    }
}
export { Fetch_array };
//  Fetch_array.fetch_all(Fetch_array.m_array())
//    .then(data=> console.log(data));
//  Fetch_array.fetchData("https://jsonplaceholder.typicode.com/todos/2")
//    .then(data=> console.log(data));