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
         import(url)
            .then(mod => {
               this.modules = { ...this.modules, ...mod }
               this.beingProcess.delete(url);
            })
            .catch(err => {
               console.log(err.message);
            })
      )
   }

   async getModule(name) {debugger;
      if(this.beingProcess.size) {
         await Promise.all([...this.beingProcess])
         return this.modules[name]
      }
      return this.modules[name]
   }
}

export const modules = new Module();