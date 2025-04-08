"use strict";(self.webpackChunkfresh_math_app=self.webpackChunkfresh_math_app||[]).push([[184],{3184:(e,t,a)=>{a.r(t),a.d(t,{SubtopicList:()=>c,default:()=>d});var s=a(5043),o=a(3216),n=a(5475),i=a(8765),r=a(579);const c=()=>{const{topicId:e}=(0,o.g)(),[t,a]=(0,s.useState)(null),[c,d]=(0,s.useState)([]),[l,u]=(0,s.useState)(!0),[p,m]=(0,s.useState)(null);return(0,s.useEffect)((()=>{(async()=>{if(e)try{u(!0);const[t,s]=await Promise.all([i.k.getTopic(e),i.k.getSubtopicsByTopic(e)]);a(t),d(s),m(null)}catch(t){console.error("Error fetching data:",t),m("Failed to load content. Please try again later.")}finally{u(!1)}})()}),[e]),l?(0,r.jsx)("div",{className:"flex justify-center items-center h-48",children:(0,r.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"})}):p||!t?(0,r.jsxs)("div",{className:"text-center py-8",children:[(0,r.jsx)("div",{className:"text-red-500 mb-4",children:p||"Topic not found"}),(0,r.jsx)(n.N_,{to:"/",className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",children:"Return to Topics"})]}):(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"mb-8",children:(0,r.jsxs)(n.N_,{to:"/",className:"text-blue-500 hover:text-blue-600 flex items-center",children:[(0,r.jsx)("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})}),"Back to Topics"]})}),(0,r.jsxs)("div",{className:"mb-8",children:[(0,r.jsx)("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:t.name}),(0,r.jsx)("p",{className:"text-gray-600",children:"Select a subtopic to view resources"})]}),0===c.length?(0,r.jsx)("div",{className:"text-center py-8 text-gray-600",children:"No subtopics available for this topic yet."}):(0,r.jsx)("div",{className:"grid gap-6 md:grid-cols-2 lg:grid-cols-3",children:c.map((e=>(0,r.jsxs)(n.N_,{to:`/subtopic/${e.$id}`,className:"block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200",children:[(0,r.jsx)("h2",{className:"text-xl font-semibold text-gray-900 mb-2",children:e.name}),(0,r.jsx)("p",{className:"text-gray-600",children:"View questions, answers, and resources"}),(0,r.jsxs)("div",{className:"mt-4 flex items-center text-blue-600",children:[(0,r.jsx)("span",{className:"text-sm",children:"View resources"}),(0,r.jsx)("svg",{className:"w-4 h-4 ml-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]},e.$id)))})]})},d=c},4471:(e,t,a)=>{a.d(t,{A:()=>s});const s=[{$id:"number-systems",name:"Number Systems",slug:"number-systems",$collectionId:"topics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[],subtopics:[{$id:"ns-1",name:"Natural numbers, integers, primes, etc.",slug:"natural-numbers",topicId:"number-systems",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"ns-2",name:"Standard Form",slug:"standard-form",topicId:"number-systems",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"ns-3",name:"Common factors, HCF, LCM",slug:"common-factors",topicId:"number-systems",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"ns-4",name:"Four operations and brackets",slug:"four-operations",topicId:"number-systems",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"ns-5",name:"Surds and rationalization",slug:"surds",topicId:"number-systems",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"ns-6",name:"Decimals, fractions and percentages",slug:"decimals-fractions",topicId:"number-systems",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]}]},{$id:"algebraic-manipulation",name:"Algebraic Manipulation",slug:"algebraic-manipulation",$collectionId:"topics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[],subtopics:[{$id:"am-1",name:"Rules for exponents, Indices",slug:"exponents-indices",topicId:"algebraic-manipulation",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"am-2",name:"Expansion of brackets",slug:"expansion-brackets",topicId:"algebraic-manipulation",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"am-3",name:"Factorisation techniques",slug:"factorisation",topicId:"algebraic-manipulation",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]}]},{$id:"mensuration",name:"Mensuration",slug:"mensuration",$collectionId:"topics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[],subtopics:[{$id:"mns-1",name:"Units of Measurement",slug:"units-measurement",topicId:"mensuration",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"mns-2",name:"Perimeter and area of shapes",slug:"perimeter-area",topicId:"mensuration",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"mns-3",name:"Circle properties",slug:"circle-properties",topicId:"mensuration",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]}]},{$id:"linear-patterns",name:"Linear Patterns and Models",slug:"linear-patterns",$collectionId:"topics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[],subtopics:[{$id:"lpm-1",name:"Linear equations",slug:"linear-equations",topicId:"linear-patterns",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"lpm-2",name:"Inequalities",slug:"inequalities",topicId:"linear-patterns",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"lpm-3",name:"Linear functions",slug:"linear-functions",topicId:"linear-patterns",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"lpm-4",name:"Simultaneous equations",slug:"simultaneous-equations",topicId:"linear-patterns",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]}]},{$id:"angles",name:"Angles",slug:"angles",$collectionId:"topics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[],subtopics:[{$id:"ang-1",name:"Geometric terms and vocabulary",slug:"geometric-terms",topicId:"angles",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"ang-2",name:"Measuring and drawing angles",slug:"measuring-angles",topicId:"angles",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"ang-3",name:"Angle relationships",slug:"angle-relationships",topicId:"angles",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"ang-4",name:"Pythagoras Theorem",slug:"pythagoras-theorem",topicId:"angles",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]}]},{$id:"trigonometry",name:"Trigonometry",slug:"trigonometry",$collectionId:"topics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[],subtopics:[{$id:"trig-1",name:"Right-angled Trigonometry",slug:"right-angled-trigonometry",topicId:"trigonometry",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"trig-2",name:"Angles of elevation and depression",slug:"angles-elevation-depression",topicId:"trigonometry",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]},{$id:"trig-3",name:"Periodic Functions",slug:"periodic-functions",topicId:"trigonometry",$collectionId:"subtopics",$databaseId:"database",$createdAt:(new Date).toISOString(),$updatedAt:(new Date).toISOString(),$permissions:[]}]}]},8765:(e,t,a)=>{a.d(t,{k:()=>u});var s=a(5460);const o={endpoint:"https://cloud.appwrite.io/v1",projectId:"67eff58c0026f452ff3d",databaseId:"67f158d4000cb981963",bucketId:"67f03c12001381e227aa",topicsCollectionId:"67f158f50030e9e503ea",subtopicsCollectionId:"67f159150030e9e503eb",resourcesCollectionId:"67f159550030e9e503e9"},n=(new s.Kj).setEndpoint(o.endpoint).setProject(o.projectId),i=(new s.Lv(n),new s.wc(n),o);var r=a(4471);const c=(new s.Kj).setEndpoint(i.endpoint).setProject(i.projectId),d=new s.Lv(c),l=new s.wc(c),u={async getTopics(){try{return(await d.listDocuments(i.databaseId,i.topicsCollectionId)).documents}catch(e){throw console.error("Error fetching topics:",e),e}},async getTopic(e){try{return await d.getDocument(i.databaseId,i.topicsCollectionId,e)}catch(t){throw console.error("Error fetching topic:",t),t}},async createTopic(e){try{return await d.createDocument(i.databaseId,i.topicsCollectionId,s.ID.unique(),e)}catch(t){throw console.error("Error creating topic:",t),t}},async getSubtopicsByTopic(e){try{return(await d.listDocuments(i.databaseId,i.subtopicsCollectionId,[s.XK.equal("topicId",e)])).documents}catch(t){throw console.error("Error fetching subtopics:",t),t}},async getSubtopic(e){try{return await d.getDocument(i.databaseId,i.subtopicsCollectionId,e)}catch(t){throw console.error("Error fetching subtopic:",t),t}},async createSubtopic(e){try{return await d.createDocument(i.databaseId,i.subtopicsCollectionId,s.ID.unique(),e)}catch(t){throw console.error("Error creating subtopic:",t),t}},async getResourcesBySubtopic(e){try{return(await d.listDocuments(i.databaseId,i.resourcesCollectionId,[s.XK.equal("subtopicId",e)])).documents}catch(t){throw console.error("Error fetching resources:",t),t}},async createResource(e){try{return await d.createDocument(i.databaseId,i.resourcesCollectionId,s.ID.unique(),e)}catch(t){throw console.error("Error creating resource:",t),t}},async uploadFile(e){try{return(await l.createFile(i.bucketId,s.ID.unique(),e)).$id}catch(t){throw console.error("Error uploading file:",t),t}},async deleteFile(e){try{await l.deleteFile(i.bucketId,e)}catch(t){throw console.error("Error deleting file:",t),t}},getFileView:e=>l.getFileView(i.bucketId,e).toString(),async migrateContent(){try{return await async function(){const e={topics:0,subtopics:0,resources:0,failed:0};try{for(const a of r.A)try{if(await u.createTopic({name:a.name,slug:a.slug}),e.topics++,a.subtopics)for(const s of a.subtopics)try{await u.createSubtopic({name:s.name,slug:s.slug,topicId:a.$id}),e.subtopics++}catch(t){console.error(`Failed to create subtopic ${s.name}:`,t),e.failed++}}catch(t){console.error(`Failed to create topic ${a.name}:`,t),e.failed++}return{success:!0,message:"Migration completed successfully",stats:e}}catch(t){return console.error("Migration failed:",t),{success:!1,message:t instanceof Error?t.message:"Migration failed",stats:e}}}()}catch(e){return console.error("Migration failed:",e),{success:!1,message:e instanceof Error?e.message:"Migration failed",stats:{topics:0,subtopics:0,resources:0,failed:1}}}}}}}]);
//# sourceMappingURL=184.49339ff8.chunk.js.map