export class Module {
   modules
   urls
   beingProcess
   constructor() {
      this.modules = {};
      this.urls = new Set; // for import done
      this.beingProcess = new Set;// for url import being process
   }

   addModule(url) {
      if (this.urls.has(url)) return
      this.beingProcess.add(
         importJs(url)
            .then(mod => {
               this.modules = { ...this.modules, ...mod }
               this.beingProcess.delete(url);
            })
            .catch(err => {
               console.log(err.message);
            })
      )
   }

   async getModule(name) {
      if(this.beingProcess.size) {
         await Promise.all([...this.beingProcess])
         return this.modules[name]
      }
      return this.modules[name]
   }
}

export const modules = new Module();

async function importJs(url = 'https://raw.githubusercontent.com/Srabutdotcom/aid/master/whatis/whatis.js') {
   const response = await fetch(url);
   if (!response.ok) {
      console.error('Failed to fetch the file');
      return;
   }

   const blob = await response.blob();
   return await import(URL.createObjectURL(new Blob([blob], { type: 'text/javascript' })))
}