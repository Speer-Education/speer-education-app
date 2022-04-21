ERROR in src/App.tsx:55:14

TS2367: This condition will always return 'true' since the types 'User | null' and 'boolean' have no overlap.
    53 |         <Suspense fallback={<AppLoader/>}>
    54 |           <Routes>
  > 55 |             {user !== false? <>
       |              ^^^^^^^^^^^^^^
    56 |               <Route path="/*" element={<LazyMainApp />}/>
    57 |               <Route path={"/login"} element={<LazyLogin />}/>
    58 |               <Route path="/onboarding" element={<LazyOnboarding />}/>


ERROR in src/App.tsx:62:14

TS2367: This condition will always return 'false' since the types 'User | null' and 'boolean' have no overlap.
    60 |               {/* <Route path="*" component={NotFoundPage}/> */}
    61 |             </>: <Route path={"/login"} element={<LazyLogin />}/>}
  > 62 |             {user === false && <Route path="/" element={<Navigate to="/login" />}/>}
       |              ^^^^^^^^^^^^^^
    63 |           </Routes>
    64 |         </Suspense>
    65 |         <ServiceWorkerWrapper/>


ERROR in src/components/AppNavbar/UserMenu/UserMenu.tsx:9:24

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     7 |     const navigate = useNavigate();
     8 |     const location = useLocation();
  >  9 |     if (!user) return <div></div>;
       |                        ^^^
    10 |     return <div className="relative" >
    11 |         <div className="flex flex-col px-3 cursor-pointer" onClick={() => navigate('/profile')}>
    12 |             <img 


ERROR in src/components/AppNavbar/UserMenu/UserMenu.tsx:10:13

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     8 |     const location = useLocation();
     9 |     if (!user) return <div></div>;
  > 10 |     return <div className="relative" >
       |             ^^^
    11 |         <div className="flex flex-col px-3 cursor-pointer" onClick={() => navigate('/profile')}>
    12 |             <img 
    13 |                 className={`w-6 h-6 lg:w-10 lg:h-10 overflow-hidden transition-all duration-150 shadow-lg hover:shadow-xl object-cover rounded-full  ${('/profile' === location.pathname) ? 'border-2 border-solid border-[#F58A07]' : ''}`} 


ERROR in src/components/AppNavbar/UserMenu/UserMenu.tsx:11:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     9 |     if (!user) return <div></div>;
    10 |     return <div className="relative" >
  > 11 |         <div className="flex flex-col px-3 cursor-pointer" onClick={() => navigate('/profile')}>
       |          ^^^
    12 |             <img 
    13 |                 className={`w-6 h-6 lg:w-10 lg:h-10 overflow-hidden transition-all duration-150 shadow-lg hover:shadow-xl object-cover rounded-full  ${('/profile' === location.pathname) ? 'border-2 border-solid border-[#F58A07]' : ''}`} 
    14 |                 src={`${user.photoURL}?${Date.now()}`} 


ERROR in src/components/AppNavbar/UserMenu/UserMenu.tsx:12:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    10 |     return <div className="relative" >
    11 |         <div className="flex flex-col px-3 cursor-pointer" onClick={() => navigate('/profile')}>
  > 12 |             <img 
       |              ^^^
    13 |                 className={`w-6 h-6 lg:w-10 lg:h-10 overflow-hidden transition-all duration-150 shadow-lg hover:shadow-xl object-cover rounded-full  ${('/profile' === location.pathname) ? 'border-2 border-solid border-[#F58A07]' : ''}`} 
    14 |                 src={`${user.photoURL}?${Date.now()}`} 
    15 |                 alt="avatar" />


ERROR in src/components/Blog/BlogContent.tsx:9:13

TS2339: Property 'id' does not exist on type 'PlatformBlogDocument | undefined'.
     7 | const BlogContent = forwardRef<HTMLDivElement, { content: PlatformBlogDocument }>(({ content: { id: slug } }, ref) => {
     8 |     const [content, setContent] = useState<PlatformBlogDocument>();
  >  9 |     const { id, title, body, description } = content;
       |             ^^
    10 |     const [loading, setLoading] = useState<boolean>(true);
    11 |     const editorRef = useRef();
    12 |     useEffect(() => {


ERROR in src/components/Blog/BlogContent.tsx:9:17

TS2339: Property 'title' does not exist on type 'PlatformBlogDocument | undefined'.
     7 | const BlogContent = forwardRef<HTMLDivElement, { content: PlatformBlogDocument }>(({ content: { id: slug } }, ref) => {
     8 |     const [content, setContent] = useState<PlatformBlogDocument>();
  >  9 |     const { id, title, body, description } = content;
       |                 ^^^^^
    10 |     const [loading, setLoading] = useState<boolean>(true);
    11 |     const editorRef = useRef();
    12 |     useEffect(() => {


ERROR in src/components/Blog/BlogContent.tsx:9:24

TS2339: Property 'body' does not exist on type 'PlatformBlogDocument | undefined'.
     7 | const BlogContent = forwardRef<HTMLDivElement, { content: PlatformBlogDocument }>(({ content: { id: slug } }, ref) => {
     8 |     const [content, setContent] = useState<PlatformBlogDocument>();
  >  9 |     const { id, title, body, description } = content;
       |                        ^^^^
    10 |     const [loading, setLoading] = useState<boolean>(true);
    11 |     const editorRef = useRef();
    12 |     useEffect(() => {


ERROR in src/components/Blog/BlogContent.tsx:9:30

TS2339: Property 'description' does not exist on type 'PlatformBlogDocument | undefined'.
     7 | const BlogContent = forwardRef<HTMLDivElement, { content: PlatformBlogDocument }>(({ content: { id: slug } }, ref) => {
     8 |     const [content, setContent] = useState<PlatformBlogDocument>();
  >  9 |     const { id, title, body, description } = content;
       |                              ^^^^^^^^^^^
    10 |     const [loading, setLoading] = useState<boolean>(true);
    11 |     const editorRef = useRef();
    12 |     useEffect(() => {


ERROR in src/components/Dashboard/BlogShowcase.tsx:23:19

TS2345: Argument of type '{ id: string; }[]' is not assignable to parameter of type 'SetStateAction<never[]>'.
  Type '{ id: string; }[]' is not assignable to type 'never[]'.
    Type '{ id: string; }' is not assignable to type 'never'.
    21 |         }
    22 |       })
  > 23 |       setBlogData(data);
       |                   ^^^^
    24 |     });
    25 |   }, []);
    26 |


ERROR in src/components/Dashboard/BlogShowcase.tsx:47:77

TS2339: Property 'id' does not exist on type 'never'.
    45 |           </div>}
    46 |         {blogData.map(blog =>
  > 47 |           <div className="flex flex-row space-x-2 cursor-pointer" key={blog.id} onClick={e => handleShowBlog(blog)}>
       |                                                                             ^^
    48 |             <div className="flex flex-col text-sm">
    49 |               <b>{blog.title}</b>
    50 |               <p className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-1 max-w-[30ch] pr-2">{blog.description}</p>


ERROR in src/components/Dashboard/BlogShowcase.tsx:49:24

TS2339: Property 'title' does not exist on type 'never'.
    47 |           <div className="flex flex-row space-x-2 cursor-pointer" key={blog.id} onClick={e => handleShowBlog(blog)}>
    48 |             <div className="flex flex-col text-sm">
  > 49 |               <b>{blog.title}</b>
       |                        ^^^^^
    50 |               <p className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-1 max-w-[30ch] pr-2">{blog.description}</p>
    51 |             </div>
    52 |           </div>


ERROR in src/components/Dashboard/BlogShowcase.tsx:50:113

TS2339: Property 'description' does not exist on type 'never'.
    48 |             <div className="flex flex-col text-sm">
    49 |               <b>{blog.title}</b>
  > 50 |               <p className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-1 max-w-[30ch] pr-2">{blog.description}</p>
       |                                                                                                                 ^^^^^^^^^^^
    51 |             </div>
    52 |           </div>
    53 |         )}


ERROR in src/components/Dashboard/BlogShowcase.tsx:57:32

TS2322: Type 'PlatformBlogDocument | undefined' is not assignable to type 'PlatformBlogDocument'.
  Type 'undefined' is not assignable to type 'PlatformBlogDocument'.
    Type 'undefined' is not assignable to type 'PlatformBlog'.
    55 |         <div className="space-y-2 inline-block w-full max-w-2xl p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
    56 |                 <div className="mt-2 h-full space-y-2 py-2 max-h-[70vh] overflow-y-auto">
  > 57 |                   <BlogContent content={activeBlog}/>
       |                                ^^^^^^^
    58 |                 </div>
    59 |                 <div className="mt-4 pt-2">
    60 |                   {/* <button


ERROR in src/components/Dashboard/MentorShowcase.tsx:24:26

TS2783: 'id' is specified more than once, so this usage will be overwritten.
    22 |         return db.collection('mentors').orderBy('_updatedOn','desc').onSnapshot(snap => {
    23 |             const allMentors = snap.docs.map( doc => {
  > 24 |                 return { id: doc.id, ...doc.data() as MentorDetailsDocument}
       |                          ^^^^^^^^^^
    25 |             })
    26 |             setMentors(allMentors.filter(({connectedMentees, id}) => !connectedMentees.includes(user?.uid) && id != user?.uid))
    27 |         })


ERROR in src/components/Dashboard/MentorShowcase.tsx:26:97

TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.
    24 |                 return { id: doc.id, ...doc.data() as MentorDetailsDocument}
    25 |             })
  > 26 |             setMentors(allMentors.filter(({connectedMentees, id}) => !connectedMentees.includes(user?.uid) && id != user?.uid))
       |                                                                                                 ^^^^^^^^^
    27 |         })
    28 |     }, [user?.uid])
    29 |


ERROR in src/components/Dashboard/OpenChats.tsx:72:46

TS2531: Object is possibly 'null'.
    70 |                             message={`${senderId === user?.uid ? "You: ":"" }${message}`} 
    71 |                             date={date} 
  > 72 |                             isUnread={read?.[user.uid]}
       |                                              ^^^^
    73 |                             roomId={roomId} />
    74 |                     }
    75 |                     


ERROR in src/components/Dashboard/OpenChats.tsx:81:48

TS2538: Type 'undefined' cannot be used as an index type.
    79 |                             key={roomId} 
    80 |                             photoUid={roomId} 
  > 81 |                             username={roomName[user?.uid]} 
       |                                                ^^^^^^^^^
    82 |                             message={`${senderId === user?.uid ? "You: ":`${senderUsername}: ` }${message}`} 
    83 |                             date={date} 
    84 |                             isUnread={read?.[user.uid]}


ERROR in src/components/Dashboard/OpenChats.tsx:84:46

TS2531: Object is possibly 'null'.
    82 |                             message={`${senderId === user?.uid ? "You: ":`${senderUsername}: ` }${message}`} 
    83 |                             date={date} 
  > 84 |                             isUnread={read?.[user.uid]}
       |                                              ^^^^
    85 |                             roomId={roomId} />
    86 |                     }
    87 |                 })}


ERROR in src/components/Dashboard/PostCard.tsx:65:35

TS2532: Object is possibly 'undefined'.
    63 |         const numNewLine = newLine?.length;
    64 |
  > 65 |         if((html.length > 1000 || numImages > 2 || numNewLine >= 10) && !oversizedPost){
       |                                   ^^^^^^^^^
    66 |             setPostCollapsed(true);
    67 |             setOversizedPost(true);
    68 |         }


ERROR in src/components/Dashboard/PostCard.tsx:65:52

TS2532: Object is possibly 'undefined'.
    63 |         const numNewLine = newLine?.length;
    64 |
  > 65 |         if((html.length > 1000 || numImages > 2 || numNewLine >= 10) && !oversizedPost){
       |                                                    ^^^^^^^^^^
    66 |             setPostCollapsed(true);
    67 |             setOversizedPost(true);
    68 |         }


ERROR in src/components/Dashboard/PostCard.tsx:123:17

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    121 |
    122 |     const PostAction = ({ IconComponent, label, active, activeColours,icon_colour, colours, ...props }) => {
  > 123 |         return <button className={`inline-flex items-center px-4 py-1 border border-transparent ${active?activeColours:colours} hover:shadow-sm text-base leading-6 font-medium rounded-md transition ease-in-out duration-150 cursor-pointer`} {...props}>
        |                 ^^^^^^
    124 |             <IconComponent className={`text-xl mr-1 ${icon_colour}`} />
    125 |             <span className="text-gray-500">{label}</span>
    126 |         </button>


ERROR in src/components/Dashboard/PostCard.tsx:124:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    122 |     const PostAction = ({ IconComponent, label, active, activeColours,icon_colour, colours, ...props }) => {
    123 |         return <button className={`inline-flex items-center px-4 py-1 border border-transparent ${active?activeColours:colours} hover:shadow-sm text-base leading-6 font-medium rounded-md transition ease-in-out duration-150 cursor-pointer`} {...props}>
  > 124 |             <IconComponent className={`text-xl mr-1 ${icon_colour}`} />
        |              ^^^^^^^^^^^^^
    125 |             <span className="text-gray-500">{label}</span>
    126 |         </button>
    127 |     }


ERROR in src/components/Dashboard/PostCard.tsx:125:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    123 |         return <button className={`inline-flex items-center px-4 py-1 border border-transparent ${active?activeColours:colours} hover:shadow-sm text-base leading-6 font-medium rounded-md transition ease-in-out duration-150 cursor-pointer`} {...props}>
    124 |             <IconComponent className={`text-xl mr-1 ${icon_colour}`} />
  > 125 |             <span className="text-gray-500">{label}</span>
        |              ^^^^
    126 |         </button>
    127 |     }
    128 |     


ERROR in src/components/Dashboard/PostCard.tsx:131:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    129 |
    130 |     return loading ?
  > 131 |         <SlideTransition in timeout={150}>
        |          ^^^^^^^^^^^^^^^
    132 |             <PostLoader/>
    133 |         </SlideTransition> :
    134 |         <SlideTransition in timeout={150}>


ERROR in src/components/Dashboard/PostCard.tsx:132:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    130 |     return loading ?
    131 |         <SlideTransition in timeout={150}>
  > 132 |             <PostLoader/>
        |              ^^^^^^^^^^
    133 |         </SlideTransition> :
    134 |         <SlideTransition in timeout={150}>
    135 |             <div className={`py-4 px-6 bg-white rounded-xl shadow-lg overflow-hidden space-y-2 transition ${isEdit ? "border-solid border-2 border-blue-500" : null}`}>


ERROR in src/components/Dashboard/PostCard.tsx:134:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    132 |             <PostLoader/>
    133 |         </SlideTransition> :
  > 134 |         <SlideTransition in timeout={150}>
        |          ^^^^^^^^^^^^^^^
    135 |             <div className={`py-4 px-6 bg-white rounded-xl shadow-lg overflow-hidden space-y-2 transition ${isEdit ? "border-solid border-2 border-blue-500" : null}`}>
    136 |                 <div className="post-author_container w-full">
    137 |                     <div className="flex flex-row flex-1 items-center cursor-pointer" onClick={e => navigate(`/profile/${author}`)}>


ERROR in src/components/Dashboard/PostCard.tsx:135:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    133 |         </SlideTransition> :
    134 |         <SlideTransition in timeout={150}>
  > 135 |             <div className={`py-4 px-6 bg-white rounded-xl shadow-lg overflow-hidden space-y-2 transition ${isEdit ? "border-solid border-2 border-blue-500" : null}`}>
        |              ^^^
    136 |                 <div className="post-author_container w-full">
    137 |                     <div className="flex flex-row flex-1 items-center cursor-pointer" onClick={e => navigate(`/profile/${author}`)}>
    138 |                         <ProfilePicture uid={author} className="shadow-md bg-blue-400 overflow-hidden h-12 w-12 rounded-full" />


ERROR in src/components/Dashboard/PostCard.tsx:136:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    134 |         <SlideTransition in timeout={150}>
    135 |             <div className={`py-4 px-6 bg-white rounded-xl shadow-lg overflow-hidden space-y-2 transition ${isEdit ? "border-solid border-2 border-blue-500" : null}`}>
  > 136 |                 <div className="post-author_container w-full">
        |                  ^^^
    137 |                     <div className="flex flex-row flex-1 items-center cursor-pointer" onClick={e => navigate(`/profile/${author}`)}>
    138 |                         <ProfilePicture uid={author} className="shadow-md bg-blue-400 overflow-hidden h-12 w-12 rounded-full" />
    139 |                         <div className="flex-1 space-y-2 py-1 ml-2">


ERROR in src/components/Dashboard/PostCard.tsx:137:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    135 |             <div className={`py-4 px-6 bg-white rounded-xl shadow-lg overflow-hidden space-y-2 transition ${isEdit ? "border-solid border-2 border-blue-500" : null}`}>
    136 |                 <div className="post-author_container w-full">
  > 137 |                     <div className="flex flex-row flex-1 items-center cursor-pointer" onClick={e => navigate(`/profile/${author}`)}>
        |                      ^^^
    138 |                         <ProfilePicture uid={author} className="shadow-md bg-blue-400 overflow-hidden h-12 w-12 rounded-full" />
    139 |                         <div className="flex-1 space-y-2 py-1 ml-2">
    140 |                             <div className="text-xl font-medium">{authorProfile?.name}</div>


ERROR in src/components/Dashboard/PostCard.tsx:138:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    136 |                 <div className="post-author_container w-full">
    137 |                     <div className="flex flex-row flex-1 items-center cursor-pointer" onClick={e => navigate(`/profile/${author}`)}>
  > 138 |                         <ProfilePicture uid={author} className="shadow-md bg-blue-400 overflow-hidden h-12 w-12 rounded-full" />
        |                          ^^^^^^^^^^^^^^
    139 |                         <div className="flex-1 space-y-2 py-1 ml-2">
    140 |                             <div className="text-xl font-medium">{authorProfile?.name}</div>
    141 |                             {_createdOn && <div className="post-timestamp_text"><TimeAgo date={_createdOn.toDate().getTime()} /></div>}


ERROR in src/components/Dashboard/PostCard.tsx:139:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    137 |                     <div className="flex flex-row flex-1 items-center cursor-pointer" onClick={e => navigate(`/profile/${author}`)}>
    138 |                         <ProfilePicture uid={author} className="shadow-md bg-blue-400 overflow-hidden h-12 w-12 rounded-full" />
  > 139 |                         <div className="flex-1 space-y-2 py-1 ml-2">
        |                          ^^^
    140 |                             <div className="text-xl font-medium">{authorProfile?.name}</div>
    141 |                             {_createdOn && <div className="post-timestamp_text"><TimeAgo date={_createdOn.toDate().getTime()} /></div>}
    142 |                         </div>


ERROR in src/components/Dashboard/PostCard.tsx:140:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    138 |                         <ProfilePicture uid={author} className="shadow-md bg-blue-400 overflow-hidden h-12 w-12 rounded-full" />
    139 |                         <div className="flex-1 space-y-2 py-1 ml-2">
  > 140 |                             <div className="text-xl font-medium">{authorProfile?.name}</div>
        |                              ^^^
    141 |                             {_createdOn && <div className="post-timestamp_text"><TimeAgo date={_createdOn.toDate().getTime()} /></div>}
    142 |                         </div>
    143 |                     </div>


ERROR in src/components/Dashboard/PostCard.tsx:141:45

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    139 |                         <div className="flex-1 space-y-2 py-1 ml-2">
    140 |                             <div className="text-xl font-medium">{authorProfile?.name}</div>
  > 141 |                             {_createdOn && <div className="post-timestamp_text"><TimeAgo date={_createdOn.toDate().getTime()} /></div>}
        |                                             ^^^
    142 |                         </div>
    143 |                     </div>
    144 |                     {(user?.uid === author) && <div>


ERROR in src/components/Dashboard/PostCard.tsx:141:82

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    139 |                         <div className="flex-1 space-y-2 py-1 ml-2">
    140 |                             <div className="text-xl font-medium">{authorProfile?.name}</div>
  > 141 |                             {_createdOn && <div className="post-timestamp_text"><TimeAgo date={_createdOn.toDate().getTime()} /></div>}
        |                                                                                  ^^^^^^^
    142 |                         </div>
    143 |                     </div>
    144 |                     {(user?.uid === author) && <div>


ERROR in src/components/Dashboard/PostCard.tsx:144:49

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    142 |                         </div>
    143 |                     </div>
  > 144 |                     {(user?.uid === author) && <div>
        |                                                 ^^^
    145 |                         <IconButton
    146 |                             aria-label="delete"
    147 |                             className="float-right"


ERROR in src/components/Dashboard/PostCard.tsx:145:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    143 |                     </div>
    144 |                     {(user?.uid === author) && <div>
  > 145 |                         <IconButton
        |                          ^^^^^^^^^^
    146 |                             aria-label="delete"
    147 |                             className="float-right"
    148 |                             onClick={handleDeletePost}


ERROR in src/components/Dashboard/PostCard.tsx:150:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    148 |                             onClick={handleDeletePost}
    149 |                             size="large">
  > 150 |                             <DeleteIcon className="text-red-600" />
        |                              ^^^^^^^^^^
    151 |                         </IconButton>
    152 |                         {!isEdit? <IconButton
    153 |                             aria-label="delete"


ERROR in src/components/Dashboard/PostCard.tsx:152:36

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    150 |                             <DeleteIcon className="text-red-600" />
    151 |                         </IconButton>
  > 152 |                         {!isEdit? <IconButton
        |                                    ^^^^^^^^^^
    153 |                             aria-label="delete"
    154 |                             className="float-right"
    155 |                             onClick={() => setIsEdit(true)}


ERROR in src/components/Dashboard/PostCard.tsx:157:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    155 |                             onClick={() => setIsEdit(true)}
    156 |                             size="large">
  > 157 |                             <EditOutlined className="text-blue-600"/>
        |                              ^^^^^^^^^^^^
    158 |                         </IconButton> : <IconButton
    159 |                             aria-label="delete"
    160 |                             className="float-right"


ERROR in src/components/Dashboard/PostCard.tsx:158:42

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    156 |                             size="large">
    157 |                             <EditOutlined className="text-blue-600"/>
  > 158 |                         </IconButton> : <IconButton
        |                                          ^^^^^^^^^^
    159 |                             aria-label="delete"
    160 |                             className="float-right"
    161 |                             onClick={() => setIsEdit(false)}


ERROR in src/components/Dashboard/PostCard.tsx:163:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    161 |                             onClick={() => setIsEdit(false)}
    162 |                             size="large">
  > 163 |                             <Cancel className="text-blue-600"/>
        |                              ^^^^^^
    164 |                         </IconButton>}
    165 |                     </div>}
    166 |                 </div>


ERROR in src/components/Dashboard/PostCard.tsx:167:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    165 |                     </div>}
    166 |                 </div>
  > 167 |                 <div ref={divRef} className="overflow-hidden" style={{'maxHeight':postCollapsed?'500px':''}}>
        |                  ^^^
    168 |                     {/* <MDEditor defaultValue={body} readOnly={!isEdit} onChange={val => setEditedPostContent(val())}/> */}
    169 |                 </div>
    170 |                 {postCollapsed && <span className="-mt-2 text-sm cursor-pointer text-blue-600" onClick={() => setPostCollapsed(false)}>See More</span>}


ERROR in src/components/Dashboard/PostCard.tsx:167:22

TS2322: Type 'MutableRefObject<undefined>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
  Type 'MutableRefObject<undefined>' is not assignable to type 'RefObject<HTMLDivElement>'.
    Types of property 'current' are incompatible.
      Type 'undefined' is not assignable to type 'HTMLDivElement | null'.
    165 |                     </div>}
    166 |                 </div>
  > 167 |                 <div ref={divRef} className="overflow-hidden" style={{'maxHeight':postCollapsed?'500px':''}}>
        |                      ^^^
    168 |                     {/* <MDEditor defaultValue={body} readOnly={!isEdit} onChange={val => setEditedPostContent(val())}/> */}
    169 |                 </div>
    170 |                 {postCollapsed && <span className="-mt-2 text-sm cursor-pointer text-blue-600" onClick={() => setPostCollapsed(false)}>See More</span>}


ERROR in src/components/Dashboard/PostCard.tsx:170:36

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    168 |                     {/* <MDEditor defaultValue={body} readOnly={!isEdit} onChange={val => setEditedPostContent(val())}/> */}
    169 |                 </div>
  > 170 |                 {postCollapsed && <span className="-mt-2 text-sm cursor-pointer text-blue-600" onClick={() => setPostCollapsed(false)}>See More</span>}
        |                                    ^^^^
    171 |                 <div className="flex flex-row">
    172 |                     <div className=" border-0 border-t border-solid border-gray-400 py-2">
    173 |                         <PostAction 


ERROR in src/components/Dashboard/PostCard.tsx:171:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    169 |                 </div>
    170 |                 {postCollapsed && <span className="-mt-2 text-sm cursor-pointer text-blue-600" onClick={() => setPostCollapsed(false)}>See More</span>}
  > 171 |                 <div className="flex flex-row">
        |                  ^^^
    172 |                     <div className=" border-0 border-t border-solid border-gray-400 py-2">
    173 |                         <PostAction 
    174 |                             activeColours="bg-red-100 hover:bg-red-200 text-red-500"


ERROR in src/components/Dashboard/PostCard.tsx:172:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    170 |                 {postCollapsed && <span className="-mt-2 text-sm cursor-pointer text-blue-600" onClick={() => setPostCollapsed(false)}>See More</span>}
    171 |                 <div className="flex flex-row">
  > 172 |                     <div className=" border-0 border-t border-solid border-gray-400 py-2">
        |                      ^^^
    173 |                         <PostAction 
    174 |                             activeColours="bg-red-100 hover:bg-red-200 text-red-500"
    175 |                             colours="bg-white hover:bg-red-100 text-gray-500"


ERROR in src/components/Dashboard/PostCard.tsx:173:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    171 |                 <div className="flex flex-row">
    172 |                     <div className=" border-0 border-t border-solid border-gray-400 py-2">
  > 173 |                         <PostAction 
        |                          ^^^^^^^^^^
    174 |                             activeColours="bg-red-100 hover:bg-red-200 text-red-500"
    175 |                             colours="bg-white hover:bg-red-100 text-gray-500"
    176 |                             icon_colour="text-red-500"


ERROR in src/components/Dashboard/PostCard.tsx:182:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    180 |                         active={userLiked}/>
    181 |                     </div>
  > 182 |                     <div className=" border-0 border-t border-solid border-gray-400 py-2">
        |                      ^^^
    183 |                         <PostAction 
    184 |                             activeColours="bg-green-100 hover:bg-green-200 text-green-500"
    185 |                             colours="bg-white hover:bg-green-100 text-gray-500"


ERROR in src/components/Dashboard/PostCard.tsx:183:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    181 |                     </div>
    182 |                     <div className=" border-0 border-t border-solid border-gray-400 py-2">
  > 183 |                         <PostAction 
        |                          ^^^^^^^^^^
    184 |                             activeColours="bg-green-100 hover:bg-green-200 text-green-500"
    185 |                             colours="bg-white hover:bg-green-100 text-gray-500"
    186 |                             icon_colour="text-green-500"


ERROR in src/components/Dashboard/PostCard.tsx:192:36

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    190 |                             active={showComments}/>
    191 |                     </div>
  > 192 |                         {isEdit ? <Button 
        |                                    ^^^^^^
    193 |                             className="float-right"
    194 |                             // disabled={saving || (editedPostContent.length === 0) || body === editedPostContent} //TODO: fix this 
    195 |                             variant="contained" 


ERROR in src/components/Dashboard/PostCard.tsx:199:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    197 |                             onClick={createNewPost}>Save</Button> : null}
    198 |                 </div>
  > 199 |                 <TransitionGroup>
        |                  ^^^^^^^^^^^^^^^
    200 |                     {showComments && <Collapse in={showComments}>
    201 |                         <PostComments post={post} />
    202 |                     </Collapse>}


ERROR in src/components/Dashboard/PostCard.tsx:200:39

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    198 |                 </div>
    199 |                 <TransitionGroup>
  > 200 |                     {showComments && <Collapse in={showComments}>
        |                                       ^^^^^^^^
    201 |                         <PostComments post={post} />
    202 |                     </Collapse>}
    203 |                 </TransitionGroup>


ERROR in src/components/Dashboard/PostCard.tsx:201:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    199 |                 <TransitionGroup>
    200 |                     {showComments && <Collapse in={showComments}>
  > 201 |                         <PostComments post={post} />
        |                          ^^^^^^^^^^^^
    202 |                     </Collapse>}
    203 |                 </TransitionGroup>
    204 |             </div>


ERROR in src/components/Dashboard/PostComments.tsx:53:57

TS2339: Property 'id' does not exist on type 'never'.
    51 |         snapshot.forEach((message) => {
    52 |             // filter out any duplicates (from modify/delete events)         
  > 53 |             commentsArray = commentsArray.filter(x => x.id !== message.id)
       |                                                         ^^
    54 |             commentsArray.push({ id: message.id, ...message.data() })
    55 |         })
    56 |


ERROR in src/components/Dashboard/PostComments.tsx:54:34

TS2322: Type 'any' is not assignable to type 'never'.
    52 |             // filter out any duplicates (from modify/delete events)         
    53 |             commentsArray = commentsArray.filter(x => x.id !== message.id)
  > 54 |             commentsArray.push({ id: message.id, ...message.data() })
       |                                  ^^
    55 |         })
    56 |
    57 |         // remove post from local array if deleted


ERROR in src/components/Dashboard/PostComments.tsx:62:61

TS2339: Property 'id' does not exist on type 'never'.
    60 |                 const message = change.doc
    61 |                 //Remove post from our array if it is here
  > 62 |                 commentsArray = commentsArray.filter(x => x.id !== message.id)
       |                                                             ^^
    63 |             }
    64 |         });
    65 |


ERROR in src/components/Dashboard/PostComments.tsx:68:22

TS2339: Property 'toDate' does not exist on type 'never'.
    66 |         //Sort array because it is unsorted
    67 |         commentsArray.sort(({ commentedOn: x }, { commentedOn: y }) => {
  > 68 |             return y.toDate() - x.toDate()
       |                      ^^^^^^
    69 |         })
    70 |
    71 |         setComments(commentsArray)


ERROR in src/components/Dashboard/PostComments.tsx:68:35

TS2339: Property 'toDate' does not exist on type 'never'.
    66 |         //Sort array because it is unsorted
    67 |         commentsArray.sort(({ commentedOn: x }, { commentedOn: y }) => {
  > 68 |             return y.toDate() - x.toDate()
       |                                   ^^^^^^
    69 |         })
    70 |
    71 |         setComments(commentsArray)


ERROR in src/components/Dashboard/PostComments.tsx:83:9

TS2322: Type 'QueryDocumentSnapshot<DocumentData>' is not assignable to type 'null'.
    81 |             .limit(DOCUMENTS_PER_PAGE))
    82 |         // save startAt snapshot
  > 83 |         end = snapshots.docs[snapshots.docs.length - 1]
       |         ^^^
    84 |         // create listener using startAt snapshot (starting boundary)    
    85 |         let listener = (end?
    86 |             ref.orderBy('commentedOn', 'desc').endAt(end):


ERROR in src/components/Dashboard/PostComments.tsx:90:24

TS2345: Argument of type '() => void' is not assignable to parameter of type 'never'.
    88 |             .onSnapshot(handleUpdatedComments)
    89 |         // add listener to list
  > 90 |         listeners.push(listener)
       |                        ^^^^^^^^
    91 |     }
    92 |
    93 |     async function getMoreComments() {


ERROR in src/components/Dashboard/PostComments.tsx:109:9

TS2322: Type 'QueryDocumentSnapshot<DocumentData>' is not assignable to type 'null'.
    107 |         // previous starting boundary becomes new ending boundary
    108 |         start = end
  > 109 |         end = snapshots.docs[snapshots.docs.length - 1]
        |         ^^^
    110 |         // create another listener using new boundaries     
    111 |         if (!end) {
    112 |             setLoadedAllPosts(true);


ERROR in src/components/Dashboard/PostComments.tsx:119:24

TS2345: Argument of type '() => void' is not assignable to parameter of type 'never'.
    117 |             .endAt(end).startAfter(start)
    118 |             .onSnapshot(handleUpdatedComments)
  > 119 |         listeners.push(listener)
        |                        ^^^^^^^^
    120 |     }
    121 |
    122 |     // call to detach all listeners


ERROR in src/components/Dashboard/PostComments.tsx:124:39

TS2349: This expression is not callable.
  Type 'never' has no call signatures.
    122 |     // call to detach all listeners
    123 |     function detachListeners() {
  > 124 |         listeners.forEach(listener => listener())
        |                                       ^^^^^^^^
    125 |     }
    126 |
    127 |     const handleSubmitCommment = async () => {


ERROR in src/components/Dashboard/PostComments.tsx:143:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    141 |
    142 |     return (
  > 143 |         <div className="border-t border-0 border-solid border-gray-200 space-y-3" ref={ref}>
        |          ^^^
    144 |             <div className="flex flex-row ">
    145 |                 <TextField 
    146 |                     label="Comment" 


ERROR in src/components/Dashboard/PostComments.tsx:144:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    142 |     return (
    143 |         <div className="border-t border-0 border-solid border-gray-200 space-y-3" ref={ref}>
  > 144 |             <div className="flex flex-row ">
        |              ^^^
    145 |                 <TextField 
    146 |                     label="Comment" 
    147 |                     value={userComment} 


ERROR in src/components/Dashboard/PostComments.tsx:145:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    143 |         <div className="border-t border-0 border-solid border-gray-200 space-y-3" ref={ref}>
    144 |             <div className="flex flex-row ">
  > 145 |                 <TextField 
        |                  ^^^^^^^^^
    146 |                     label="Comment" 
    147 |                     value={userComment} 
    148 |                     onChange={e => setUserComment(e.target.value)} 


ERROR in src/components/Dashboard/PostComments.tsx:154:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    152 |                     fullWidth
    153 |                     margin="normal"/>
  > 154 |                 <div className="flex-1 grid place-items-center">
        |                  ^^^
    155 |                     <IconButton onClick={handleSubmitCommment} size="large">
    156 |                         <Send className="text-speer-blue"/>
    157 |                     </IconButton>


ERROR in src/components/Dashboard/PostComments.tsx:155:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    153 |                     margin="normal"/>
    154 |                 <div className="flex-1 grid place-items-center">
  > 155 |                     <IconButton onClick={handleSubmitCommment} size="large">
        |                      ^^^^^^^^^^
    156 |                         <Send className="text-speer-blue"/>
    157 |                     </IconButton>
    158 |                 </div>


ERROR in src/components/Dashboard/PostComments.tsx:156:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    154 |                 <div className="flex-1 grid place-items-center">
    155 |                     <IconButton onClick={handleSubmitCommment} size="large">
  > 156 |                         <Send className="text-speer-blue"/>
        |                          ^^^^
    157 |                     </IconButton>
    158 |                 </div>
    159 |             </div>


ERROR in src/components/Dashboard/PostComments.tsx:160:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    158 |                 </div>
    159 |             </div>
  > 160 |             <TransitionGroup>
        |              ^^^^^^^^^^^^^^^
    161 |             {comments.map(({ comment, author, id, commentedOn}) => (
    162 |                 <Collapse key={id}>
    163 |                     <div className="w-full flex flex-row space-x-2 flex-1 items-top">


ERROR in src/components/Dashboard/PostComments.tsx:162:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    160 |             <TransitionGroup>
    161 |             {comments.map(({ comment, author, id, commentedOn}) => (
  > 162 |                 <Collapse key={id}>
        |                  ^^^^^^^^
    163 |                     <div className="w-full flex flex-row space-x-2 flex-1 items-top">
    164 |                         <ProfilePicture uid={author?.uid} thumb className="w-10 h-10 rounded-full mt-1 cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}/>
    165 |                         <div className="flex flex-col flex-1">


ERROR in src/components/Dashboard/PostComments.tsx:163:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    161 |             {comments.map(({ comment, author, id, commentedOn}) => (
    162 |                 <Collapse key={id}>
  > 163 |                     <div className="w-full flex flex-row space-x-2 flex-1 items-top">
        |                      ^^^
    164 |                         <ProfilePicture uid={author?.uid} thumb className="w-10 h-10 rounded-full mt-1 cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}/>
    165 |                         <div className="flex flex-col flex-1">
    166 |                             <div className="flex flex-row space-x-2 items-baseline">


ERROR in src/components/Dashboard/PostComments.tsx:164:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    162 |                 <Collapse key={id}>
    163 |                     <div className="w-full flex flex-row space-x-2 flex-1 items-top">
  > 164 |                         <ProfilePicture uid={author?.uid} thumb className="w-10 h-10 rounded-full mt-1 cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}/>
        |                          ^^^^^^^^^^^^^^
    165 |                         <div className="flex flex-col flex-1">
    166 |                             <div className="flex flex-row space-x-2 items-baseline">
    167 |                                 <h4 className="font-semibold cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}>{author?.name}</h4>


ERROR in src/components/Dashboard/PostComments.tsx:165:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    163 |                     <div className="w-full flex flex-row space-x-2 flex-1 items-top">
    164 |                         <ProfilePicture uid={author?.uid} thumb className="w-10 h-10 rounded-full mt-1 cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}/>
  > 165 |                         <div className="flex flex-col flex-1">
        |                          ^^^
    166 |                             <div className="flex flex-row space-x-2 items-baseline">
    167 |                                 <h4 className="font-semibold cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}>{author?.name}</h4>
    168 |                                 {commentedOn && <TimeAgo className="text-gray-400 text-sm" date={commentedOn.toMillis()}/>}


ERROR in src/components/Dashboard/PostComments.tsx:166:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    164 |                         <ProfilePicture uid={author?.uid} thumb className="w-10 h-10 rounded-full mt-1 cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}/>
    165 |                         <div className="flex flex-col flex-1">
  > 166 |                             <div className="flex flex-row space-x-2 items-baseline">
        |                              ^^^
    167 |                                 <h4 className="font-semibold cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}>{author?.name}</h4>
    168 |                                 {commentedOn && <TimeAgo className="text-gray-400 text-sm" date={commentedOn.toMillis()}/>}
    169 |                             </div>


ERROR in src/components/Dashboard/PostComments.tsx:167:34

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    165 |                         <div className="flex flex-col flex-1">
    166 |                             <div className="flex flex-row space-x-2 items-baseline">
  > 167 |                                 <h4 className="font-semibold cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}>{author?.name}</h4>
        |                                  ^^
    168 |                                 {commentedOn && <TimeAgo className="text-gray-400 text-sm" date={commentedOn.toMillis()}/>}
    169 |                             </div>
    170 |                             <h4 className="text-gray-600 text-normal font-normal">{comment}</h4>


ERROR in src/components/Dashboard/PostComments.tsx:168:50

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    166 |                             <div className="flex flex-row space-x-2 items-baseline">
    167 |                                 <h4 className="font-semibold cursor-pointer" onClick={() => navigate(`/profile/${author?.uid}`)}>{author?.name}</h4>
  > 168 |                                 {commentedOn && <TimeAgo className="text-gray-400 text-sm" date={commentedOn.toMillis()}/>}
        |                                                  ^^^^^^^
    169 |                             </div>
    170 |                             <h4 className="text-gray-600 text-normal font-normal">{comment}</h4>
    171 |                         </div>


ERROR in src/components/Dashboard/PostComments.tsx:170:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    168 |                                 {commentedOn && <TimeAgo className="text-gray-400 text-sm" date={commentedOn.toMillis()}/>}
    169 |                             </div>
  > 170 |                             <h4 className="text-gray-600 text-normal font-normal">{comment}</h4>
        |                              ^^
    171 |                         </div>
    172 |                         {(author?.uid == uid) && <IconButton
    173 |                             onClick={() => db.collection(`posts/${post.id}/comments`).doc(id).delete()}


ERROR in src/components/Dashboard/PostComments.tsx:172:51

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    170 |                             <h4 className="text-gray-600 text-normal font-normal">{comment}</h4>
    171 |                         </div>
  > 172 |                         {(author?.uid == uid) && <IconButton
        |                                                   ^^^^^^^^^^
    173 |                             onClick={() => db.collection(`posts/${post.id}/comments`).doc(id).delete()}
    174 |                             size="large">
    175 |                             <DeleteIcon className="text-red-500"/>


ERROR in src/components/Dashboard/PostComments.tsx:175:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    173 |                             onClick={() => db.collection(`posts/${post.id}/comments`).doc(id).delete()}
    174 |                             size="large">
  > 175 |                             <DeleteIcon className="text-red-500"/>
        |                              ^^^^^^^^^^
    176 |                         </IconButton>}
    177 |                     </div>
    178 |                 </Collapse>


ERROR in src/components/Dashboard/PostComments.tsx:181:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    179 |             ))}
    180 |             </TransitionGroup>
  > 181 |             <Transition
        |              ^^^^^^^^^^
    182 |                 as={Fragment}
    183 |                 show={loading}
    184 |                 enter="transform transition duration-[400ms]"


ERROR in src/components/Dashboard/PostComments.tsx:191:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    189 |                 leaveTo="opacity-0 scale-95"
    190 |             >
  > 191 |                 <div className="w-full flex flex-row space-x-2 flex-1 items-top animate-pulse">
        |                  ^^^
    192 |                     <div className="rounded-full bg-gray-300 w-10 h-10 mt-1"></div>
    193 |                     <div className="flex flex-col flex-1 space-y-2">
    194 |                         <div className="flex flex-row space-x-2 items-baseline">


ERROR in src/components/Dashboard/PostComments.tsx:192:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    190 |             >
    191 |                 <div className="w-full flex flex-row space-x-2 flex-1 items-top animate-pulse">
  > 192 |                     <div className="rounded-full bg-gray-300 w-10 h-10 mt-1"></div>
        |                      ^^^
    193 |                     <div className="flex flex-col flex-1 space-y-2">
    194 |                         <div className="flex flex-row space-x-2 items-baseline">
    195 |                             <div className="h-4 bg-gray-300 rounded w-3/12"></div>


ERROR in src/components/Dashboard/PostComments.tsx:193:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    191 |                 <div className="w-full flex flex-row space-x-2 flex-1 items-top animate-pulse">
    192 |                     <div className="rounded-full bg-gray-300 w-10 h-10 mt-1"></div>
  > 193 |                     <div className="flex flex-col flex-1 space-y-2">
        |                      ^^^
    194 |                         <div className="flex flex-row space-x-2 items-baseline">
    195 |                             <div className="h-4 bg-gray-300 rounded w-3/12"></div>
    196 |                         </div>


ERROR in src/components/Dashboard/PostComments.tsx:194:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    192 |                     <div className="rounded-full bg-gray-300 w-10 h-10 mt-1"></div>
    193 |                     <div className="flex flex-col flex-1 space-y-2">
  > 194 |                         <div className="flex flex-row space-x-2 items-baseline">
        |                          ^^^
    195 |                             <div className="h-4 bg-gray-300 rounded w-3/12"></div>
    196 |                         </div>
    197 |                         <div className="h-4 bg-gray-300 rounded w-5/6"></div>


ERROR in src/components/Dashboard/PostComments.tsx:195:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    193 |                     <div className="flex flex-col flex-1 space-y-2">
    194 |                         <div className="flex flex-row space-x-2 items-baseline">
  > 195 |                             <div className="h-4 bg-gray-300 rounded w-3/12"></div>
        |                              ^^^
    196 |                         </div>
    197 |                         <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    198 |                     </div>


ERROR in src/components/Dashboard/PostComments.tsx:197:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    195 |                             <div className="h-4 bg-gray-300 rounded w-3/12"></div>
    196 |                         </div>
  > 197 |                         <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        |                          ^^^
    198 |                     </div>
    199 |                 </div>
    200 |             </Transition>


ERROR in src/components/Dashboard/PostComments.tsx:201:58

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    199 |                 </div>
    200 |             </Transition>
  > 201 |             {!loadedAllPosts && comments.length != 0 && <a className="underline text-blue-700 block" onClick={getMoreComments}>Load More</a>}
        |                                                          ^
    202 |         </div>
    203 |     );
    204 | })


ERROR in src/components/Dashboard/PostComposerCard.tsx:16:45

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    14 | import ReactQuill from 'react-quill';
    15 |
  > 16 | const AddImageButton = ({fileCallback}) => (<>
       |                                             ^^
    17 |     <input id="uwu" type="file" name="file" accept="image/*" onChange={({ target }) => fileCallback(target.files[0])} hidden />
    18 |     <label htmlFor="uwu" className="w-min flex flex-row items-center h-6 px-2 py-4 cursor-pointer mt-4 rounded-full text-green-500">
    19 |       <Image />


ERROR in src/components/Dashboard/PostComposerCard.tsx:17:6

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    15 |
    16 | const AddImageButton = ({fileCallback}) => (<>
  > 17 |     <input id="uwu" type="file" name="file" accept="image/*" onChange={({ target }) => fileCallback(target.files[0])} hidden />
       |      ^^^^^
    18 |     <label htmlFor="uwu" className="w-min flex flex-row items-center h-6 px-2 py-4 cursor-pointer mt-4 rounded-full text-green-500">
    19 |       <Image />
    20 |     </label >


ERROR in src/components/Dashboard/PostComposerCard.tsx:17:101

TS2531: Object is possibly 'null'.
    15 |
    16 | const AddImageButton = ({fileCallback}) => (<>
  > 17 |     <input id="uwu" type="file" name="file" accept="image/*" onChange={({ target }) => fileCallback(target.files[0])} hidden />
       |                                                                                                     ^^^^^^^^^^^^
    18 |     <label htmlFor="uwu" className="w-min flex flex-row items-center h-6 px-2 py-4 cursor-pointer mt-4 rounded-full text-green-500">
    19 |       <Image />
    20 |     </label >


ERROR in src/components/Dashboard/PostComposerCard.tsx:18:6

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    16 | const AddImageButton = ({fileCallback}) => (<>
    17 |     <input id="uwu" type="file" name="file" accept="image/*" onChange={({ target }) => fileCallback(target.files[0])} hidden />
  > 18 |     <label htmlFor="uwu" className="w-min flex flex-row items-center h-6 px-2 py-4 cursor-pointer mt-4 rounded-full text-green-500">
       |      ^^^^^
    19 |       <Image />
    20 |     </label >
    21 |   </>)


ERROR in src/components/Dashboard/PostComposerCard.tsx:19:8

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    17 |     <input id="uwu" type="file" name="file" accept="image/*" onChange={({ target }) => fileCallback(target.files[0])} hidden />
    18 |     <label htmlFor="uwu" className="w-min flex flex-row items-center h-6 px-2 py-4 cursor-pointer mt-4 rounded-full text-green-500">
  > 19 |       <Image />
       |        ^^^^^
    20 |     </label >
    21 |   </>)
    22 |   


ERROR in src/components/Dashboard/PostComposerCard.tsx:26:12

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    24 |     const [open, setOpen] = useState(false);
    25 |
  > 26 |     return <>
       |            ^^
    27 |         <AddYoutubeDialog open={open} onClose={() => setOpen(false)} onUrl={url => {
    28 |             setOpen(false); 
    29 |             urlCallback(url)


ERROR in src/components/Dashboard/PostComposerCard.tsx:27:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    25 |
    26 |     return <>
  > 27 |         <AddYoutubeDialog open={open} onClose={() => setOpen(false)} onUrl={url => {
       |          ^^^^^^^^^^^^^^^^
    28 |             setOpen(false); 
    29 |             urlCallback(url)
    30 |         }}/>


ERROR in src/components/Dashboard/PostComposerCard.tsx:31:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    29 |             urlCallback(url)
    30 |         }}/>
  > 31 |         <label htmlFor="no" className="w-min flex flex-row items-center h-6 px-2 py-4 cursor-pointer mt-4 rounded-full text-red-500" onClick={_ => setOpen(true)} >
       |          ^^^^^
    32 |             <YouTube />
    33 |         </label >
    34 |     </>


ERROR in src/components/Dashboard/PostComposerCard.tsx:32:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    30 |         }}/>
    31 |         <label htmlFor="no" className="w-min flex flex-row items-center h-6 px-2 py-4 cursor-pointer mt-4 rounded-full text-red-500" onClick={_ => setOpen(true)} >
  > 32 |             <YouTube />
       |              ^^^^^^^
    33 |         </label >
    34 |     </>
    35 | }


ERROR in src/components/Dashboard/PostComposerCard.tsx:39:13

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    37 | const AddYoutubeDialog =({ open, onClose, onUrl }) => {
    38 |     const [link, setLink] = useState("");
  > 39 |     return <DialogBase open={open} onClose={onClose}>
       |             ^^^^^^^^^^
    40 |         <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
    41 |             <Dialog.Title
    42 |                 as="h3"


ERROR in src/components/Dashboard/PostComposerCard.tsx:40:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    38 |     const [link, setLink] = useState("");
    39 |     return <DialogBase open={open} onClose={onClose}>
  > 40 |         <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
       |          ^^^
    41 |             <Dialog.Title
    42 |                 as="h3"
    43 |                 className="text-lg font-medium leading-6 text-gray-900"


ERROR in src/components/Dashboard/PostComposerCard.tsx:41:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    39 |     return <DialogBase open={open} onClose={onClose}>
    40 |         <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
  > 41 |             <Dialog.Title
       |              ^^^^^^^^^^^^
    42 |                 as="h3"
    43 |                 className="text-lg font-medium leading-6 text-gray-900"
    44 |             >


ERROR in src/components/Dashboard/PostComposerCard.tsx:47:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    45 |                 Add Youtube Link
    46 |             </Dialog.Title>
  > 47 |             <div className="mt-2 h-full">
       |              ^^^
    48 |                 <TextField label="Youtube Link" fullWidth={true} value={link} onChange={e => setLink(e.target.value)}/>
    49 |             </div>
    50 |


ERROR in src/components/Dashboard/PostComposerCard.tsx:48:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    46 |             </Dialog.Title>
    47 |             <div className="mt-2 h-full">
  > 48 |                 <TextField label="Youtube Link" fullWidth={true} value={link} onChange={e => setLink(e.target.value)}/>
       |                  ^^^^^^^^^
    49 |             </div>
    50 |
    51 |             <div className="mt-4 float-right space-x-2">


ERROR in src/components/Dashboard/PostComposerCard.tsx:51:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    49 |             </div>
    50 |
  > 51 |             <div className="mt-4 float-right space-x-2">
       |              ^^^
    52 |                 <button
    53 |                         type="button"
    54 |                         className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"


ERROR in src/components/Dashboard/PostComposerCard.tsx:52:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    50 |
    51 |             <div className="mt-4 float-right space-x-2">
  > 52 |                 <button
       |                  ^^^^^^
    53 |                         type="button"
    54 |                         className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    55 |                         onClick={_ => {


ERROR in src/components/Dashboard/PostComposerCard.tsx:62:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    60 |                     Done
    61 |                 </button>
  > 62 |                 <button
       |                  ^^^^^^
    63 |                     type="button"
    64 |                     className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    65 |                     onClick={onClose}


ERROR in src/components/Dashboard/PostComposerCard.tsx:109:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    107 |
    108 |     return (
  > 109 |         <SlideTransition in timeout={50}>
        |          ^^^^^^^^^^^^^^^
    110 |             <div className="post-composer">
    111 |                 <div className="flex-1 flex flex-row">
    112 |                     {user?.uid && <ProfilePicture uid={user?.uid} className="w-12 h-12 rounded-full"/>}


ERROR in src/components/Dashboard/PostComposerCard.tsx:110:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    108 |     return (
    109 |         <SlideTransition in timeout={50}>
  > 110 |             <div className="post-composer">
        |              ^^^
    111 |                 <div className="flex-1 flex flex-row">
    112 |                     {user?.uid && <ProfilePicture uid={user?.uid} className="w-12 h-12 rounded-full"/>}
    113 |                     {/* <div className="pl-5 flex-1"> */}


ERROR in src/components/Dashboard/PostComposerCard.tsx:111:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    109 |         <SlideTransition in timeout={50}>
    110 |             <div className="post-composer">
  > 111 |                 <div className="flex-1 flex flex-row">
        |                  ^^^
    112 |                     {user?.uid && <ProfilePicture uid={user?.uid} className="w-12 h-12 rounded-full"/>}
    113 |                     {/* <div className="pl-5 flex-1"> */}
    114 |                     {!saving && <MDEditor ref={editor} docId={docId} onChange={(content, delta, source, editor) => setPostContent(editor.getContents())}/>}


ERROR in src/components/Dashboard/PostComposerCard.tsx:112:36

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    110 |             <div className="post-composer">
    111 |                 <div className="flex-1 flex flex-row">
  > 112 |                     {user?.uid && <ProfilePicture uid={user?.uid} className="w-12 h-12 rounded-full"/>}
        |                                    ^^^^^^^^^^^^^^
    113 |                     {/* <div className="pl-5 flex-1"> */}
    114 |                     {!saving && <MDEditor ref={editor} docId={docId} onChange={(content, delta, source, editor) => setPostContent(editor.getContents())}/>}
    115 |                     {/* </div> */}


ERROR in src/components/Dashboard/PostComposerCard.tsx:114:34

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    112 |                     {user?.uid && <ProfilePicture uid={user?.uid} className="w-12 h-12 rounded-full"/>}
    113 |                     {/* <div className="pl-5 flex-1"> */}
  > 114 |                     {!saving && <MDEditor ref={editor} docId={docId} onChange={(content, delta, source, editor) => setPostContent(editor.getContents())}/>}
        |                                  ^^^^^^^^
    115 |                     {/* </div> */}
    116 |                 </div>
    117 |                 <div className="flex flex-row w-full justify-between">


ERROR in src/components/Dashboard/PostComposerCard.tsx:114:43

TS2322: Type 'MutableRefObject<ReactQuill | undefined>' is not assignable to type 'Ref<ReactQuill> | undefined'.
  Type 'MutableRefObject<ReactQuill | undefined>' is not assignable to type 'RefObject<ReactQuill>'.
    Types of property 'current' are incompatible.
      Type 'ReactQuill | undefined' is not assignable to type 'ReactQuill | null'.
        Type 'undefined' is not assignable to type 'ReactQuill | null'.
    112 |                     {user?.uid && <ProfilePicture uid={user?.uid} className="w-12 h-12 rounded-full"/>}
    113 |                     {/* <div className="pl-5 flex-1"> */}
  > 114 |                     {!saving && <MDEditor ref={editor} docId={docId} onChange={(content, delta, source, editor) => setPostContent(editor.getContents())}/>}
        |                                           ^^^
    115 |                     {/* </div> */}
    116 |                 </div>
    117 |                 <div className="flex flex-row w-full justify-between">


ERROR in src/components/Dashboard/PostComposerCard.tsx:117:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    115 |                     {/* </div> */}
    116 |                 </div>
  > 117 |                 <div className="flex flex-row w-full justify-between">
        |                  ^^^
    118 |                     {/* {!editor.current?.readonly &&<div className="flex flex-row ">
    119 |                         <AddImageButton fileCallback={editor.current?.handleExternalImageUpload}/>
    120 |                         <AddYoutubeButton urlCallback={editor.current?.handleAddYoutubeVideo}/>


ERROR in src/components/Dashboard/PostComposerCard.tsx:123:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    121 |                     </div>} */}
    122 |                     
  > 123 |                     <Button 
        |                      ^^^^^^
    124 |                         className="float-right"
    125 |                         disabled={saving} 
    126 |                         variant="contained" 


ERROR in src/components/Dashboard/PostStream.tsx:44:51

TS2339: Property 'id' does not exist on type 'never'.
    42 |         snapshot.forEach((message) => {
    43 |             // filter out any duplicates (from modify/delete events)         
  > 44 |             postsArray = postsArray.filter(x => x.id !== message.id)
       |                                                   ^^
    45 |             postsArray.push({ id: message.id, ...message.data() })
    46 |         })
    47 |


ERROR in src/components/Dashboard/PostStream.tsx:45:31

TS2322: Type 'any' is not assignable to type 'never'.
    43 |             // filter out any duplicates (from modify/delete events)         
    44 |             postsArray = postsArray.filter(x => x.id !== message.id)
  > 45 |             postsArray.push({ id: message.id, ...message.data() })
       |                               ^^
    46 |         })
    47 |
    48 |         // remove post from local array if deleted


ERROR in src/components/Dashboard/PostStream.tsx:53:55

TS2339: Property 'id' does not exist on type 'never'.
    51 |                 const message = change.doc
    52 |                 //Remove post from our array if it is here
  > 53 |                 postsArray = postsArray.filter(x => x.id !== message.id)
       |                                                       ^^
    54 |             }
    55 |         });
    56 |


ERROR in src/components/Dashboard/PostStream.tsx:59:22

TS2339: Property 'toDate' does not exist on type 'never'.
    57 |         //Sort array because it is unsorted
    58 |         postsArray.sort(({ _createdOn: x }, { _createdOn: y }) => {
  > 59 |             return y.toDate() - x.toDate()
       |                      ^^^^^^
    60 |         })
    61 |
    62 |         setStreamPosts(postsArray)


ERROR in src/components/Dashboard/PostStream.tsx:59:35

TS2339: Property 'toDate' does not exist on type 'never'.
    57 |         //Sort array because it is unsorted
    58 |         postsArray.sort(({ _createdOn: x }, { _createdOn: y }) => {
  > 59 |             return y.toDate() - x.toDate()
       |                                   ^^^^^^
    60 |         })
    61 |
    62 |         setStreamPosts(postsArray)


ERROR in src/components/Dashboard/PostStream.tsx:74:9

TS2322: Type 'QueryDocumentSnapshot<DocumentData>' is not assignable to type 'null'.
    72 |             .limit(DOCUMENTS_PER_PAGE))
    73 |         // save startAt snapshot
  > 74 |         end = snapshots.docs[snapshots.docs.length - 1]
       |         ^^^
    75 |         // create listener using startAt snapshot (starting boundary)    
    76 |         const query = end?ref.orderBy('_createdOn', 'desc').endAt(end):ref.orderBy('_createdOn', 'desc')
    77 |         let listener = query.onSnapshot(handleUpdatedPosts)


ERROR in src/components/Dashboard/PostStream.tsx:79:24

TS2345: Argument of type '() => void' is not assignable to parameter of type 'never'.
    77 |         let listener = query.onSnapshot(handleUpdatedPosts)
    78 |         // add listener to list
  > 79 |         listeners.push(listener)
       |                        ^^^^^^^^
    80 |     }
    81 |
    82 |     async function getMoreMessages() {


ERROR in src/components/Dashboard/PostStream.tsx:98:9

TS2322: Type 'QueryDocumentSnapshot<DocumentData>' is not assignable to type 'null'.
     96 |         // previous starting boundary becomes new ending boundary
     97 |         start = end
  >  98 |         end = snapshots.docs[snapshots.docs.length - 1]
        |         ^^^
     99 |         // create another listener using new boundaries     
    100 |         if (!end) {
    101 |             setLoadedAllPosts(true);


ERROR in src/components/Dashboard/PostStream.tsx:108:24

TS2345: Argument of type '() => void' is not assignable to parameter of type 'never'.
    106 |             .endAt(end).startAfter(start)
    107 |             .onSnapshot(handleUpdatedPosts)
  > 108 |         listeners.push(listener)
        |                        ^^^^^^^^
    109 |     }
    110 |
    111 |     // call to detach all listeners


ERROR in src/components/Dashboard/PostStream.tsx:113:39

TS2349: This expression is not callable.
  Type 'never' has no call signatures.
    111 |     // call to detach all listeners
    112 |     function detachListeners() {
  > 113 |         listeners.forEach(listener => listener())
        |                                       ^^^^^^^^
    114 |     }
    115 |
    116 |     return (


ERROR in src/components/Dashboard/PostStream.tsx:117:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    115 |
    116 |     return (
  > 117 |         <div className="space-y-2 pb-3">
        |          ^^^
    118 |             {streamPosts.length === 0 && <p className="font-semibold text-gray-600 text-lg text-center w-full">
    119 |                 Uhoh. I can't find any posts yet. <span className="text-gray-400 text-xs">or i might be a bug </span>
    120 |             </p>}


ERROR in src/components/Dashboard/PostStream.tsx:118:43

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    116 |     return (
    117 |         <div className="space-y-2 pb-3">
  > 118 |             {streamPosts.length === 0 && <p className="font-semibold text-gray-600 text-lg text-center w-full">
        |                                           ^
    119 |                 Uhoh. I can't find any posts yet. <span className="text-gray-400 text-xs">or i might be a bug </span>
    120 |             </p>}
    121 |             {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}


ERROR in src/components/Dashboard/PostStream.tsx:119:52

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    117 |         <div className="space-y-2 pb-3">
    118 |             {streamPosts.length === 0 && <p className="font-semibold text-gray-600 text-lg text-center w-full">
  > 119 |                 Uhoh. I can't find any posts yet. <span className="text-gray-400 text-xs">or i might be a bug </span>
        |                                                    ^^^^
    120 |             </p>}
    121 |             {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
    122 |             {loading && <PostLoader/>}


ERROR in src/components/Dashboard/PostStream.tsx:121:39

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    119 |                 Uhoh. I can't find any posts yet. <span className="text-gray-400 text-xs">or i might be a bug </span>
    120 |             </p>}
  > 121 |             {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
        |                                       ^^^^^^^^
    122 |             {loading && <PostLoader/>}
    123 |             <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
    124 |         </div>


ERROR in src/components/Dashboard/PostStream.tsx:121:58

TS2339: Property 'id' does not exist on type 'never'.
    119 |                 Uhoh. I can't find any posts yet. <span className="text-gray-400 text-xs">or i might be a bug </span>
    120 |             </p>}
  > 121 |             {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
        |                                                          ^^
    122 |             {loading && <PostLoader/>}
    123 |             <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
    124 |         </div>


ERROR in src/components/Dashboard/PostStream.tsx:122:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    120 |             </p>}
    121 |             {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
  > 122 |             {loading && <PostLoader/>}
        |                          ^^^^^^^^^^
    123 |             <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
    124 |         </div>
    125 |     );


ERROR in src/components/Dashboard/PostStream.tsx:123:14

TS2322: Type '{ as: string; onChange: (inView: boolean, entry: IntersectionObserverEntry) => void; }' is not assignable to type 'IntrinsicAttributes & (IntrinsicClassAttributes<InView> & ((Pick<Readonly<IntersectionObserverProps>, "children" | ... 5 more ... | "delay"> & InexactPartial<...> & InexactPartial<...>) | (Pick<...> & ... 1 more ... & InexactPartial<...>)))'.
  Property 'children' is missing in type '{ as: string; onChange: (inView: boolean, entry: IntersectionObserverEntry) => void; }' but required in type 'Pick<Readonly<PlainChildrenProps>, "children" | "ref" | "cite" | "data" | "form" | "label" | "slot" | "span" | "style" | "summary" | "title" | "pattern" | ... 354 more ... | "tag">'.
    121 |             {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
    122 |             {loading && <PostLoader/>}
  > 123 |             <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
        |              ^^^^^^
    124 |         </div>
    125 |     );
    126 | }


ERROR in src/components/Dashboard/PostStream.tsx:123:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    121 |             {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
    122 |             {loading && <PostLoader/>}
  > 123 |             <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
        |              ^^^^^^
    124 |         </div>
    125 |     );
    126 | }


ERROR in src/components/Dashboard/PostStream.tsx:123:14

TS2786: 'InView' cannot be used as a JSX component.
  Its instance type 'InView' is not a valid JSX element.
    The types returned by 'render()' are incompatible between these types.
      Type '{} | null | undefined' is not assignable to type 'ReactNode'.
        Type '{}' is not assignable to type 'ReactNode'.
    121 |             {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
    122 |             {loading && <PostLoader/>}
  > 123 |             <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
        |              ^^^^^^
    124 |         </div>
    125 |     );
    126 | }


ERROR in src/components/Dashboard/StatsCard.tsx:23:72

TS2339: Property 'rooms' does not exist on type 'UserDetailsToken'.
    21 |                 </div>
    22 |                 <div className="flex-1 px-3">
  > 23 |                     <p className="font-medium text-4xl">{(userDetails?.rooms || []).length}</p>
       |                                                                        ^^^^^
    24 |                     <p>Open Chats</p>
    25 |                 </div>
    26 |             </div>


ERROR in src/components/Dialog/DialogBase.tsx:19:8

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    17 |
    18 |   return (
  > 19 |       <Dialog
       |        ^^^^^^
    20 |         open={open}
    21 |         onClose={onClose}
    22 |       >


ERROR in src/components/Forms/contactus.tsx:93:19

TS2322: Type 'true' is not assignable to type 'string | number | readonly string[] | undefined'.
    91 |       <div className={`${mainClassName}__form-row`}>
    92 |         <select {...register('year')} name="year" onChange={handleFormInput} value={form.year} >
  > 93 |           <option value defaultValue>
       |                   ^^^^^
    94 |             Year (Optional)
    95 |           </option>
    96 |           <option value="<9">Younger</option>


ERROR in src/components/Forms/contactus.tsx:93:25

TS2322: Type 'true' is not assignable to type 'string | number | readonly string[] | undefined'.
    91 |       <div className={`${mainClassName}__form-row`}>
    92 |         <select {...register('year')} name="year" onChange={handleFormInput} value={form.year} >
  > 93 |           <option value defaultValue>
       |                         ^^^^^^^^^^^^
    94 |             Year (Optional)
    95 |           </option>
    96 |           <option value="<9">Younger</option>


ERROR in src/components/Forms/Inputs.tsx:14:9

TS2722: Cannot invoke an object which is possibly 'undefined'.
    12 |
    13 |     const handleInputChange = e => {
  > 14 |         onChange(e)
       |         ^^^^^^^^
    15 |         if (required) setEmpty(e.target.value.length === 0)
    16 |     }
    17 |


ERROR in src/components/Forms/Inputs.tsx:18:13

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    16 |     }
    17 |
  > 18 |     return <div className={`${autoWidth ? "" : "w-full"} px-3 ${className}`}>
       |             ^^^
    19 |         {label && <label className="block titlecase tracking-wide text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
    20 |             {label} {required ? <span className="text-red-600">*</span> : ""}
    21 |         </label>}


ERROR in src/components/Forms/Inputs.tsx:19:20

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    17 |
    18 |     return <div className={`${autoWidth ? "" : "w-full"} px-3 ${className}`}>
  > 19 |         {label && <label className="block titlecase tracking-wide text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
       |                    ^^^^^
    20 |             {label} {required ? <span className="text-red-600">*</span> : ""}
    21 |         </label>}
    22 |         <input ref={ref} className={`appearance-none block w-full ${empty && required ? "bg-red-100" : "bg-gray-200"} text-gray-700 placeholder-gray-400 border-0 focus:border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-500`}


ERROR in src/components/Forms/Inputs.tsx:20:34

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    18 |     return <div className={`${autoWidth ? "" : "w-full"} px-3 ${className}`}>
    19 |         {label && <label className="block titlecase tracking-wide text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
  > 20 |             {label} {required ? <span className="text-red-600">*</span> : ""}
       |                                  ^^^^
    21 |         </label>}
    22 |         <input ref={ref} className={`appearance-none block w-full ${empty && required ? "bg-red-100" : "bg-gray-200"} text-gray-700 placeholder-gray-400 border-0 focus:border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-500`}
    23 |             id={id}


ERROR in src/components/Forms/Inputs.tsx:22:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    20 |             {label} {required ? <span className="text-red-600">*</span> : ""}
    21 |         </label>}
  > 22 |         <input ref={ref} className={`appearance-none block w-full ${empty && required ? "bg-red-100" : "bg-gray-200"} text-gray-700 placeholder-gray-400 border-0 focus:border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-500`}
       |          ^^^^^
    23 |             id={id}
    24 |             onChange={handleInputChange}
    25 |             {...props} />


ERROR in src/components/Forms/Inputs.tsx:33:13

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    31 |    label: string
    32 | } & React.HTMLAttributes<HTMLTextAreaElement>)) => {
  > 33 |     return <div className={`w-full px-3 ${className}`}>
       |             ^^^
    34 |         {label && <label className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
    35 |             {label} {required ? <span className="text-red-600">*</span> : ""}
    36 |         </label>}


ERROR in src/components/Forms/Inputs.tsx:34:20

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    32 | } & React.HTMLAttributes<HTMLTextAreaElement>)) => {
    33 |     return <div className={`w-full px-3 ${className}`}>
  > 34 |         {label && <label className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
       |                    ^^^^^
    35 |             {label} {required ? <span className="text-red-600">*</span> : ""}
    36 |         </label>}
    37 |         <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border-0 focus:border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"


ERROR in src/components/Forms/Inputs.tsx:35:34

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    33 |     return <div className={`w-full px-3 ${className}`}>
    34 |         {label && <label className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
  > 35 |             {label} {required ? <span className="text-red-600">*</span> : ""}
       |                                  ^^^^
    36 |         </label>}
    37 |         <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border-0 focus:border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    38 |             id={id}


ERROR in src/components/Forms/Inputs.tsx:37:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    35 |             {label} {required ? <span className="text-red-600">*</span> : ""}
    36 |         </label>}
  > 37 |         <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border-0 focus:border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
       |          ^^^^^^^^
    38 |             id={id}
    39 |             {...props} />
    40 |     </div>


ERROR in src/components/Forms/Inputs.tsx:72:13

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    70 |
    71 | const InputSelect = ({ className, label, id, required = false, ...props }) => {
  > 72 |     return <div className={`w-full px-3 ${className}`}>
       |             ^^^
    73 |         <label className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
    74 |             {label} {required ? <span className="text-red-600">*</span> : ""}
    75 |         </label>


ERROR in src/components/Forms/Inputs.tsx:73:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    71 | const InputSelect = ({ className, label, id, required = false, ...props }) => {
    72 |     return <div className={`w-full px-3 ${className}`}>
  > 73 |         <label className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
       |          ^^^^^
    74 |             {label} {required ? <span className="text-red-600">*</span> : ""}
    75 |         </label>
    76 |         <Select className="user-details__custom-select" styles={selectStyle} id={id} {...props} />


ERROR in src/components/Forms/Inputs.tsx:74:34

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    72 |     return <div className={`w-full px-3 ${className}`}>
    73 |         <label className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2" style={{color: "#2596be"}} htmlFor={id}>
  > 74 |             {label} {required ? <span className="text-red-600">*</span> : ""}
       |                                  ^^^^
    75 |         </label>
    76 |         <Select className="user-details__custom-select" styles={selectStyle} id={id} {...props} />
    77 |     </div>


ERROR in src/components/Forms/Inputs.tsx:76:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    74 |             {label} {required ? <span className="text-red-600">*</span> : ""}
    75 |         </label>
  > 76 |         <Select className="user-details__custom-select" styles={selectStyle} id={id} {...props} />
       |          ^^^^^^
    77 |     </div>
    78 | }
    79 |


ERROR in src/components/Loader/AppLoader.tsx:5:6

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    3 | export default function AppLoader() {
    4 |     return (
  > 5 |     <div className="grid place-items-center w-screen h-screen bg-gray-100">
      |      ^^^
    6 |         <div className="flex flex-col items-center space-y-2">
    7 |             <img className="object-contain w-24 p-4" src="/rocket-logo@3x.png" />
    8 |             <h2>Loading Speer App</h2>


ERROR in src/components/Loader/AppLoader.tsx:6:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    4 |     return (
    5 |     <div className="grid place-items-center w-screen h-screen bg-gray-100">
  > 6 |         <div className="flex flex-col items-center space-y-2">
      |          ^^^
    7 |             <img className="object-contain w-24 p-4" src="/rocket-logo@3x.png" />
    8 |             <h2>Loading Speer App</h2>
    9 |             <p>Please Wait</p>


ERROR in src/components/Loader/AppLoader.tsx:7:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     5 |     <div className="grid place-items-center w-screen h-screen bg-gray-100">
     6 |         <div className="flex flex-col items-center space-y-2">
  >  7 |             <img className="object-contain w-24 p-4" src="/rocket-logo@3x.png" />
       |              ^^^
     8 |             <h2>Loading Speer App</h2>
     9 |             <p>Please Wait</p>
    10 |             <div className="animate-pulse h-2 rounded-md w-52 bg-gray-400"></div>


ERROR in src/components/Loader/AppLoader.tsx:8:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     6 |         <div className="flex flex-col items-center space-y-2">
     7 |             <img className="object-contain w-24 p-4" src="/rocket-logo@3x.png" />
  >  8 |             <h2>Loading Speer App</h2>
       |              ^^
     9 |             <p>Please Wait</p>
    10 |             <div className="animate-pulse h-2 rounded-md w-52 bg-gray-400"></div>
    11 |         </div>


ERROR in src/components/Loader/AppLoader.tsx:9:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     7 |             <img className="object-contain w-24 p-4" src="/rocket-logo@3x.png" />
     8 |             <h2>Loading Speer App</h2>
  >  9 |             <p>Please Wait</p>
       |              ^
    10 |             <div className="animate-pulse h-2 rounded-md w-52 bg-gray-400"></div>
    11 |         </div>
    12 |     </div>)


ERROR in src/components/Loader/AppLoader.tsx:10:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     8 |             <h2>Loading Speer App</h2>
     9 |             <p>Please Wait</p>
  > 10 |             <div className="animate-pulse h-2 rounded-md w-52 bg-gray-400"></div>
       |              ^^^
    11 |         </div>
    12 |     </div>)
    13 | }


ERROR in src/components/Loader/Spinner.tsx:2:13

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    1 | const Spinner = ({className = ""} : {className?: string}) => {
  > 2 |     return <svg className={`animate-spin h-5 w-5 ${className}`} viewBox="0 0 24 24">
      |             ^^^
    3 |         <circle className="opacity-5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    4 |         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    5 |     </svg>


ERROR in src/components/Loader/Spinner.tsx:3:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    1 | const Spinner = ({className = ""} : {className?: string}) => {
    2 |     return <svg className={`animate-spin h-5 w-5 ${className}`} viewBox="0 0 24 24">
  > 3 |         <circle className="opacity-5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      |          ^^^^^^
    4 |         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    5 |     </svg>
    6 | }


ERROR in src/components/Loader/Spinner.tsx:4:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    2 |     return <svg className={`animate-spin h-5 w-5 ${className}`} viewBox="0 0 24 24">
    3 |         <circle className="opacity-5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  > 4 |         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      |          ^^^^
    5 |     </svg>
    6 | }
    7 |


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:12:34

TS2339: Property 'id' does not exist on type '{}'.
    10 | import { useNavigate } from 'react-router-dom';
    11 |
  > 12 | const MentorCard = forwardRef(({ id, name, school, major, bio, highlight1, highlight2, isMtr=true }, ref) => {
       |                                  ^^
    13 |     const [message, setMessage] = useState("");
    14 |     const { user, userDetails } = useAuth();
    15 |     const [sendingMessage, setSendingMessage] = useState(false);


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:12:38

TS2339: Property 'name' does not exist on type '{}'.
    10 | import { useNavigate } from 'react-router-dom';
    11 |
  > 12 | const MentorCard = forwardRef(({ id, name, school, major, bio, highlight1, highlight2, isMtr=true }, ref) => {
       |                                      ^^^^
    13 |     const [message, setMessage] = useState("");
    14 |     const { user, userDetails } = useAuth();
    15 |     const [sendingMessage, setSendingMessage] = useState(false);


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:12:44

TS2339: Property 'school' does not exist on type '{}'.
    10 | import { useNavigate } from 'react-router-dom';
    11 |
  > 12 | const MentorCard = forwardRef(({ id, name, school, major, bio, highlight1, highlight2, isMtr=true }, ref) => {
       |                                            ^^^^^^
    13 |     const [message, setMessage] = useState("");
    14 |     const { user, userDetails } = useAuth();
    15 |     const [sendingMessage, setSendingMessage] = useState(false);


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:12:52

TS2339: Property 'major' does not exist on type '{}'.
    10 | import { useNavigate } from 'react-router-dom';
    11 |
  > 12 | const MentorCard = forwardRef(({ id, name, school, major, bio, highlight1, highlight2, isMtr=true }, ref) => {
       |                                                    ^^^^^
    13 |     const [message, setMessage] = useState("");
    14 |     const { user, userDetails } = useAuth();
    15 |     const [sendingMessage, setSendingMessage] = useState(false);


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:12:59

TS2339: Property 'bio' does not exist on type '{}'.
    10 | import { useNavigate } from 'react-router-dom';
    11 |
  > 12 | const MentorCard = forwardRef(({ id, name, school, major, bio, highlight1, highlight2, isMtr=true }, ref) => {
       |                                                           ^^^
    13 |     const [message, setMessage] = useState("");
    14 |     const { user, userDetails } = useAuth();
    15 |     const [sendingMessage, setSendingMessage] = useState(false);


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:12:64

TS2339: Property 'highlight1' does not exist on type '{}'.
    10 | import { useNavigate } from 'react-router-dom';
    11 |
  > 12 | const MentorCard = forwardRef(({ id, name, school, major, bio, highlight1, highlight2, isMtr=true }, ref) => {
       |                                                                ^^^^^^^^^^
    13 |     const [message, setMessage] = useState("");
    14 |     const { user, userDetails } = useAuth();
    15 |     const [sendingMessage, setSendingMessage] = useState(false);


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:12:76

TS2339: Property 'highlight2' does not exist on type '{}'.
    10 | import { useNavigate } from 'react-router-dom';
    11 |
  > 12 | const MentorCard = forwardRef(({ id, name, school, major, bio, highlight1, highlight2, isMtr=true }, ref) => {
       |                                                                            ^^^^^^^^^^
    13 |     const [message, setMessage] = useState("");
    14 |     const { user, userDetails } = useAuth();
    15 |     const [sendingMessage, setSendingMessage] = useState(false);


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:12:88

TS2339: Property 'isMtr' does not exist on type '{}'.
    10 | import { useNavigate } from 'react-router-dom';
    11 |
  > 12 | const MentorCard = forwardRef(({ id, name, school, major, bio, highlight1, highlight2, isMtr=true }, ref) => {
       |                                                                                        ^^^^^
    13 |     const [message, setMessage] = useState("");
    14 |     const { user, userDetails } = useAuth();
    15 |     const [sendingMessage, setSendingMessage] = useState(false);


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:54:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    52 |
    53 |     return (
  > 54 |         <div ref={ref} className="bg-white rounded-lg shadow-lg flex flex-col items-center p-3 mt-16 min-h-80 transition-transform transform hover:scale-105 duration-200 cursor-pointer" style={{flex: "1 0 30%", width: '17.5rem'}}>
       |          ^^^
    55 |             <ProfilePicture uid={id} alt="mentor" className="w-28 h-28 transform rounded-full -mt-16 border-white border-8 border-solid shadow-lg" style={{aspectRatio: '1'}} onClick={() => navigate(`/profile/${id}`)}/>
    56 |             <div className="mt-2 space-y-2 h-full flex flex-col w-full">
    57 |                 <div className="space-y-1 text-center transform" onClick={() => navigate(`/profile/${id}`)}>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:54:14

TS2322: Type 'ForwardedRef<unknown>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
  Type 'MutableRefObject<unknown>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
    Type 'MutableRefObject<unknown>' is not assignable to type 'RefObject<HTMLDivElement>'.
      Types of property 'current' are incompatible.
        Type 'unknown' is not assignable to type 'HTMLDivElement | null'.
    52 |
    53 |     return (
  > 54 |         <div ref={ref} className="bg-white rounded-lg shadow-lg flex flex-col items-center p-3 mt-16 min-h-80 transition-transform transform hover:scale-105 duration-200 cursor-pointer" style={{flex: "1 0 30%", width: '17.5rem'}}>
       |              ^^^
    55 |             <ProfilePicture uid={id} alt="mentor" className="w-28 h-28 transform rounded-full -mt-16 border-white border-8 border-solid shadow-lg" style={{aspectRatio: '1'}} onClick={() => navigate(`/profile/${id}`)}/>
    56 |             <div className="mt-2 space-y-2 h-full flex flex-col w-full">
    57 |                 <div className="space-y-1 text-center transform" onClick={() => navigate(`/profile/${id}`)}>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:55:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    53 |     return (
    54 |         <div ref={ref} className="bg-white rounded-lg shadow-lg flex flex-col items-center p-3 mt-16 min-h-80 transition-transform transform hover:scale-105 duration-200 cursor-pointer" style={{flex: "1 0 30%", width: '17.5rem'}}>
  > 55 |             <ProfilePicture uid={id} alt="mentor" className="w-28 h-28 transform rounded-full -mt-16 border-white border-8 border-solid shadow-lg" style={{aspectRatio: '1'}} onClick={() => navigate(`/profile/${id}`)}/>
       |              ^^^^^^^^^^^^^^
    56 |             <div className="mt-2 space-y-2 h-full flex flex-col w-full">
    57 |                 <div className="space-y-1 text-center transform" onClick={() => navigate(`/profile/${id}`)}>
    58 |                     <h3 className="font-semibold text-xl">{name}</h3>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:55:38

TS2322: Type '{ uid: any; alt: string; className: string; style: { aspectRatio: "1"; }; onClick: () => void; }' is not assignable to type 'IntrinsicAttributes & { uid: string; thumb?: boolean | undefined; className?: string | undefined; isRoom?: string | undefined; forceRefresh?: boolean | undefined; } & HTMLAttributes<...>'.
  Property 'alt' does not exist on type 'IntrinsicAttributes & { uid: string; thumb?: boolean | undefined; className?: string | undefined; isRoom?: string | undefined; forceRefresh?: boolean | undefined; } & HTMLAttributes<...>'.
    53 |     return (
    54 |         <div ref={ref} className="bg-white rounded-lg shadow-lg flex flex-col items-center p-3 mt-16 min-h-80 transition-transform transform hover:scale-105 duration-200 cursor-pointer" style={{flex: "1 0 30%", width: '17.5rem'}}>
  > 55 |             <ProfilePicture uid={id} alt="mentor" className="w-28 h-28 transform rounded-full -mt-16 border-white border-8 border-solid shadow-lg" style={{aspectRatio: '1'}} onClick={() => navigate(`/profile/${id}`)}/>
       |                                      ^^^
    56 |             <div className="mt-2 space-y-2 h-full flex flex-col w-full">
    57 |                 <div className="space-y-1 text-center transform" onClick={() => navigate(`/profile/${id}`)}>
    58 |                     <h3 className="font-semibold text-xl">{name}</h3>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:56:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    54 |         <div ref={ref} className="bg-white rounded-lg shadow-lg flex flex-col items-center p-3 mt-16 min-h-80 transition-transform transform hover:scale-105 duration-200 cursor-pointer" style={{flex: "1 0 30%", width: '17.5rem'}}>
    55 |             <ProfilePicture uid={id} alt="mentor" className="w-28 h-28 transform rounded-full -mt-16 border-white border-8 border-solid shadow-lg" style={{aspectRatio: '1'}} onClick={() => navigate(`/profile/${id}`)}/>
  > 56 |             <div className="mt-2 space-y-2 h-full flex flex-col w-full">
       |              ^^^
    57 |                 <div className="space-y-1 text-center transform" onClick={() => navigate(`/profile/${id}`)}>
    58 |                     <h3 className="font-semibold text-xl">{name}</h3>
    59 |                     <p className="text-md text-gray-600">{isMtr?"Mentor":"Student"} @ {school}</p>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:57:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    55 |             <ProfilePicture uid={id} alt="mentor" className="w-28 h-28 transform rounded-full -mt-16 border-white border-8 border-solid shadow-lg" style={{aspectRatio: '1'}} onClick={() => navigate(`/profile/${id}`)}/>
    56 |             <div className="mt-2 space-y-2 h-full flex flex-col w-full">
  > 57 |                 <div className="space-y-1 text-center transform" onClick={() => navigate(`/profile/${id}`)}>
       |                  ^^^
    58 |                     <h3 className="font-semibold text-xl">{name}</h3>
    59 |                     <p className="text-md text-gray-600">{isMtr?"Mentor":"Student"} @ {school}</p>
    60 |                 </div>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:58:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    56 |             <div className="mt-2 space-y-2 h-full flex flex-col w-full">
    57 |                 <div className="space-y-1 text-center transform" onClick={() => navigate(`/profile/${id}`)}>
  > 58 |                     <h3 className="font-semibold text-xl">{name}</h3>
       |                      ^^
    59 |                     <p className="text-md text-gray-600">{isMtr?"Mentor":"Student"} @ {school}</p>
    60 |                 </div>
    61 |                 <div className="space-y-1 text-center flex-1 transform" onClick={() => navigate(`/profile/${id}`)}>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:59:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    57 |                 <div className="space-y-1 text-center transform" onClick={() => navigate(`/profile/${id}`)}>
    58 |                     <h3 className="font-semibold text-xl">{name}</h3>
  > 59 |                     <p className="text-md text-gray-600">{isMtr?"Mentor":"Student"} @ {school}</p>
       |                      ^
    60 |                 </div>
    61 |                 <div className="space-y-1 text-center flex-1 transform" onClick={() => navigate(`/profile/${id}`)}>
    62 |                     <p className="text-md text-gray-600">{major}</p>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:61:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    59 |                     <p className="text-md text-gray-600">{isMtr?"Mentor":"Student"} @ {school}</p>
    60 |                 </div>
  > 61 |                 <div className="space-y-1 text-center flex-1 transform" onClick={() => navigate(`/profile/${id}`)}>
       |                  ^^^
    62 |                     <p className="text-md text-gray-600">{major}</p>
    63 |                     <p className="text-sm text-gray-600">{bio.substring(0, 125)}</p>
    64 |                     <p>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:62:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    60 |                 </div>
    61 |                 <div className="space-y-1 text-center flex-1 transform" onClick={() => navigate(`/profile/${id}`)}>
  > 62 |                     <p className="text-md text-gray-600">{major}</p>
       |                      ^
    63 |                     <p className="text-sm text-gray-600">{bio.substring(0, 125)}</p>
    64 |                     <p>
    65 |                         <span className="text-sm text-gray-600 pr-1">{highlight1?.emoji}</span>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:63:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    61 |                 <div className="space-y-1 text-center flex-1 transform" onClick={() => navigate(`/profile/${id}`)}>
    62 |                     <p className="text-md text-gray-600">{major}</p>
  > 63 |                     <p className="text-sm text-gray-600">{bio.substring(0, 125)}</p>
       |                      ^
    64 |                     <p>
    65 |                         <span className="text-sm text-gray-600 pr-1">{highlight1?.emoji}</span>
    66 |                         <span className="text-sm text-gray-600">{highlight1?.description}</span>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:64:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    62 |                     <p className="text-md text-gray-600">{major}</p>
    63 |                     <p className="text-sm text-gray-600">{bio.substring(0, 125)}</p>
  > 64 |                     <p>
       |                      ^
    65 |                         <span className="text-sm text-gray-600 pr-1">{highlight1?.emoji}</span>
    66 |                         <span className="text-sm text-gray-600">{highlight1?.description}</span>
    67 |                     </p>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:65:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    63 |                     <p className="text-sm text-gray-600">{bio.substring(0, 125)}</p>
    64 |                     <p>
  > 65 |                         <span className="text-sm text-gray-600 pr-1">{highlight1?.emoji}</span>
       |                          ^^^^
    66 |                         <span className="text-sm text-gray-600">{highlight1?.description}</span>
    67 |                     </p>
    68 |                     <p>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:66:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    64 |                     <p>
    65 |                         <span className="text-sm text-gray-600 pr-1">{highlight1?.emoji}</span>
  > 66 |                         <span className="text-sm text-gray-600">{highlight1?.description}</span>
       |                          ^^^^
    67 |                     </p>
    68 |                     <p>
    69 |                         <span className="text-sm text-gray-600 pr-1">{highlight2?.emoji}</span>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:68:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    66 |                         <span className="text-sm text-gray-600">{highlight1?.description}</span>
    67 |                     </p>
  > 68 |                     <p>
       |                      ^
    69 |                         <span className="text-sm text-gray-600 pr-1">{highlight2?.emoji}</span>
    70 |                         <span className="text-sm text-gray-600">{highlight2?.description}</span>
    71 |                     </p>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:69:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    67 |                     </p>
    68 |                     <p>
  > 69 |                         <span className="text-sm text-gray-600 pr-1">{highlight2?.emoji}</span>
       |                          ^^^^
    70 |                         <span className="text-sm text-gray-600">{highlight2?.description}</span>
    71 |                     </p>
    72 |                 </div>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:70:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    68 |                     <p>
    69 |                         <span className="text-sm text-gray-600 pr-1">{highlight2?.emoji}</span>
  > 70 |                         <span className="text-sm text-gray-600">{highlight2?.description}</span>
       |                          ^^^^
    71 |                     </p>
    72 |                 </div>
    73 |                 <div className="flex flex-row w-full">


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:73:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    71 |                     </p>
    72 |                 </div>
  > 73 |                 <div className="flex flex-row w-full">
       |                  ^^^
    74 |                     <input 
    75 |                         className="shadow-lg rounded-xl px-2 py-3 border-0 flex-1 focus:border-0 text-sm" 
    76 |                         placeholder="Break the ice. Say Hi 👋" 


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:74:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    72 |                 </div>
    73 |                 <div className="flex flex-row w-full">
  > 74 |                     <input 
       |                      ^^^^^
    75 |                         className="shadow-lg rounded-xl px-2 py-3 border-0 flex-1 focus:border-0 text-sm" 
    76 |                         placeholder="Break the ice. Say Hi 👋" 
    77 |                         disabled={sendingMessage}


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:80:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    78 |                         value={message} 
    79 |                         onChange={e => setMessage(e.target.value)}/>
  > 80 |                     <button 
       |                      ^^^^^^
    81 |                         type="button"
    82 |                         disabled={sendingMessage}
    83 |                         className="shadow-lg rounded-xl py-2 px-3 bg-yellow-500 border-0 ml-2 cursor-pointer"  


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:85:43

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    83 |                         className="shadow-lg rounded-xl py-2 px-3 bg-yellow-500 border-0 ml-2 cursor-pointer"  
    84 |                         onClick={connectWithMentor}>
  > 85 |                         {!sendingMessage?<SendIcon className="text-xl text-white"/>: <Spinner className="w-6 h-6 text-white"/>}
       |                                           ^^^^^^^^
    86 |                     </button>
    87 |                 </div>
    88 |             </div>


ERROR in src/components/Mentor/MentorCard/MentorCard.tsx:85:87

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    83 |                         className="shadow-lg rounded-xl py-2 px-3 bg-yellow-500 border-0 ml-2 cursor-pointer"  
    84 |                         onClick={connectWithMentor}>
  > 85 |                         {!sendingMessage?<SendIcon className="text-xl text-white"/>: <Spinner className="w-6 h-6 text-white"/>}
       |                                                                                       ^^^^^^^
    86 |                     </button>
    87 |                 </div>
    88 |             </div>


ERROR in src/components/Messaging/AttachmentItem.tsx:4:6

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    2 |
    3 | const AttachmentItem = ({ image, IconComponent, title, hoverClass="hover:bg-gray-100", subtitle,date, onClick }) => (
  > 4 |     <div className={`flex flex-row space-x-2 py-1 rounded-lg cursor-pointer ${hoverClass} w-full`} onClick={onClick}>
      |      ^^^
    5 |         <div className="h-12 w-12 bg-red-200 grid place-items-center rounded-xl overflow-hidden">
    6 |             {image?<img className="h-full w-full object-cover" src={image}/>:<IconComponent />}
    7 |         </div>


ERROR in src/components/Messaging/AttachmentItem.tsx:5:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    3 | const AttachmentItem = ({ image, IconComponent, title, hoverClass="hover:bg-gray-100", subtitle,date, onClick }) => (
    4 |     <div className={`flex flex-row space-x-2 py-1 rounded-lg cursor-pointer ${hoverClass} w-full`} onClick={onClick}>
  > 5 |         <div className="h-12 w-12 bg-red-200 grid place-items-center rounded-xl overflow-hidden">
      |          ^^^
    6 |             {image?<img className="h-full w-full object-cover" src={image}/>:<IconComponent />}
    7 |         </div>
    8 |         <div className="flex flex-col space-y-1 flex-1 overflow-hidden">


ERROR in src/components/Messaging/AttachmentItem.tsx:6:21

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    4 |     <div className={`flex flex-row space-x-2 py-1 rounded-lg cursor-pointer ${hoverClass} w-full`} onClick={onClick}>
    5 |         <div className="h-12 w-12 bg-red-200 grid place-items-center rounded-xl overflow-hidden">
  > 6 |             {image?<img className="h-full w-full object-cover" src={image}/>:<IconComponent />}
      |                     ^^^
    7 |         </div>
    8 |         <div className="flex flex-col space-y-1 flex-1 overflow-hidden">
    9 |             <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 font-bold">{title}</div>


ERROR in src/components/Messaging/AttachmentItem.tsx:6:79

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    4 |     <div className={`flex flex-row space-x-2 py-1 rounded-lg cursor-pointer ${hoverClass} w-full`} onClick={onClick}>
    5 |         <div className="h-12 w-12 bg-red-200 grid place-items-center rounded-xl overflow-hidden">
  > 6 |             {image?<img className="h-full w-full object-cover" src={image}/>:<IconComponent />}
      |                                                                               ^^^^^^^^^^^^^
    7 |         </div>
    8 |         <div className="flex flex-col space-y-1 flex-1 overflow-hidden">
    9 |             <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 font-bold">{title}</div>


ERROR in src/components/Messaging/AttachmentItem.tsx:8:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     6 |             {image?<img className="h-full w-full object-cover" src={image}/>:<IconComponent />}
     7 |         </div>
  >  8 |         <div className="flex flex-col space-y-1 flex-1 overflow-hidden">
       |          ^^^
     9 |             <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 font-bold">{title}</div>
    10 |             <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 text-gray-500"><TimeAgo date={date} />{subtitle}</div >
    11 |         </div>


ERROR in src/components/Messaging/AttachmentItem.tsx:9:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     7 |         </div>
     8 |         <div className="flex flex-col space-y-1 flex-1 overflow-hidden">
  >  9 |             <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 font-bold">{title}</div>
       |              ^^^
    10 |             <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 text-gray-500"><TimeAgo date={date} />{subtitle}</div >
    11 |         </div>
    12 |     </div>)


ERROR in src/components/Messaging/AttachmentItem.tsx:10:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     8 |         <div className="flex flex-col space-y-1 flex-1 overflow-hidden">
     9 |             <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 font-bold">{title}</div>
  > 10 |             <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 text-gray-500"><TimeAgo date={date} />{subtitle}</div >
       |              ^^^
    11 |         </div>
    12 |     </div>)
    13 |


ERROR in src/components/Messaging/AttachmentItem.tsx:10:105

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     8 |         <div className="flex flex-col space-y-1 flex-1 overflow-hidden">
     9 |             <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 font-bold">{title}</div>
  > 10 |             <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-10/12 text-gray-500"><TimeAgo date={date} />{subtitle}</div >
       |                                                                                                         ^^^^^^^
    11 |         </div>
    12 |     </div>)
    13 |


ERROR in src/components/Messaging/AttachmentsCard.tsx:11:12

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     9 |     const [open, setOpen] = useState(false);
    10 |     
  > 11 |     return <>
       |            ^^
    12 |         {open ?<LazyAttachmentsDialog open={open} onClose={_ => setOpen(false)} roomId={roomId}/> : null}
    13 |         <div className="p-3 m-2 shadow-lg rounded-md bg-white space-y-3 flex-1 max-h-full overflow-auto">
    14 |             <div className="w-full flex flex-row justify-between">


ERROR in src/components/Messaging/AttachmentsCard.tsx:12:17

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    10 |     
    11 |     return <>
  > 12 |         {open ?<LazyAttachmentsDialog open={open} onClose={_ => setOpen(false)} roomId={roomId}/> : null}
       |                 ^^^^^^^^^^^^^^^^^^^^^
    13 |         <div className="p-3 m-2 shadow-lg rounded-md bg-white space-y-3 flex-1 max-h-full overflow-auto">
    14 |             <div className="w-full flex flex-row justify-between">
    15 |                 <p className="font-medium">Shared Files and Links</p>


ERROR in src/components/Messaging/AttachmentsCard.tsx:13:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    11 |     return <>
    12 |         {open ?<LazyAttachmentsDialog open={open} onClose={_ => setOpen(false)} roomId={roomId}/> : null}
  > 13 |         <div className="p-3 m-2 shadow-lg rounded-md bg-white space-y-3 flex-1 max-h-full overflow-auto">
       |          ^^^
    14 |             <div className="w-full flex flex-row justify-between">
    15 |                 <p className="font-medium">Shared Files and Links</p>
    16 |                 {attachments.length !== 0 ? <div className="mt-auto text-blue-700 underline text-xs cursor-pointer" onClick={_ => setOpen(true)}>See All</div> : null}


ERROR in src/components/Messaging/AttachmentsCard.tsx:14:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    12 |         {open ?<LazyAttachmentsDialog open={open} onClose={_ => setOpen(false)} roomId={roomId}/> : null}
    13 |         <div className="p-3 m-2 shadow-lg rounded-md bg-white space-y-3 flex-1 max-h-full overflow-auto">
  > 14 |             <div className="w-full flex flex-row justify-between">
       |              ^^^
    15 |                 <p className="font-medium">Shared Files and Links</p>
    16 |                 {attachments.length !== 0 ? <div className="mt-auto text-blue-700 underline text-xs cursor-pointer" onClick={_ => setOpen(true)}>See All</div> : null}
    17 |             </div> 


ERROR in src/components/Messaging/AttachmentsCard.tsx:15:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    13 |         <div className="p-3 m-2 shadow-lg rounded-md bg-white space-y-3 flex-1 max-h-full overflow-auto">
    14 |             <div className="w-full flex flex-row justify-between">
  > 15 |                 <p className="font-medium">Shared Files and Links</p>
       |                  ^
    16 |                 {attachments.length !== 0 ? <div className="mt-auto text-blue-700 underline text-xs cursor-pointer" onClick={_ => setOpen(true)}>See All</div> : null}
    17 |             </div> 
    18 |             <div className="flex flex-col">


ERROR in src/components/Messaging/AttachmentsCard.tsx:16:46

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    14 |             <div className="w-full flex flex-row justify-between">
    15 |                 <p className="font-medium">Shared Files and Links</p>
  > 16 |                 {attachments.length !== 0 ? <div className="mt-auto text-blue-700 underline text-xs cursor-pointer" onClick={_ => setOpen(true)}>See All</div> : null}
       |                                              ^^^
    17 |             </div> 
    18 |             <div className="flex flex-col">
    19 |                 {attachments.length === 0? <p className="text-gray-500 text-center py-5">No Shared Files And Links</p> : null}


ERROR in src/components/Messaging/AttachmentsCard.tsx:18:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    16 |                 {attachments.length !== 0 ? <div className="mt-auto text-blue-700 underline text-xs cursor-pointer" onClick={_ => setOpen(true)}>See All</div> : null}
    17 |             </div> 
  > 18 |             <div className="flex flex-col">
       |              ^^^
    19 |                 {attachments.length === 0? <p className="text-gray-500 text-center py-5">No Shared Files And Links</p> : null}
    20 |                 {attachments.sort(({uploadedOn: x},{uploadedOn: y}) => y-x).map(({ attachmentType, url, title, image, downloadUrl, filename, fileType, fileSize, uploadedOn }) => {
    21 |                     return (attachmentType === 'url') ?  <AttachmentItem 


ERROR in src/components/Messaging/AttachmentsCard.tsx:19:45

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    17 |             </div> 
    18 |             <div className="flex flex-col">
  > 19 |                 {attachments.length === 0? <p className="text-gray-500 text-center py-5">No Shared Files And Links</p> : null}
       |                                             ^
    20 |                 {attachments.sort(({uploadedOn: x},{uploadedOn: y}) => y-x).map(({ attachmentType, url, title, image, downloadUrl, filename, fileType, fileSize, uploadedOn }) => {
    21 |                     return (attachmentType === 'url') ?  <AttachmentItem 
    22 |                             image={image}


ERROR in src/components/Messaging/AttachmentsCard.tsx:21:59

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    19 |                 {attachments.length === 0? <p className="text-gray-500 text-center py-5">No Shared Files And Links</p> : null}
    20 |                 {attachments.sort(({uploadedOn: x},{uploadedOn: y}) => y-x).map(({ attachmentType, url, title, image, downloadUrl, filename, fileType, fileSize, uploadedOn }) => {
  > 21 |                     return (attachmentType === 'url') ?  <AttachmentItem 
       |                                                           ^^^^^^^^^^^^^^
    22 |                             image={image}
    23 |                             IconComponent={FolderOpenOutlined}
    24 |                             title={title || url}


ERROR in src/components/Messaging/AttachmentsCard.tsx:21:59

TS2741: Property 'date' is missing in type '{ image: never; IconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }; title: never; subtitle: never; key: string; onClick: () => Window | null; }' but required in type '{ image: any; IconComponent: any; title: any; hoverClass?: string | undefined; subtitle: any; date: any; onClick: any; }'.
    19 |                 {attachments.length === 0? <p className="text-gray-500 text-center py-5">No Shared Files And Links</p> : null}
    20 |                 {attachments.sort(({uploadedOn: x},{uploadedOn: y}) => y-x).map(({ attachmentType, url, title, image, downloadUrl, filename, fileType, fileSize, uploadedOn }) => {
  > 21 |                     return (attachmentType === 'url') ?  <AttachmentItem 
       |                                                           ^^^^^^^^^^^^^^
    22 |                             image={image}
    23 |                             IconComponent={FolderOpenOutlined}
    24 |                             title={title || url}


ERROR in src/components/Messaging/AttachmentsCard.tsx:28:31

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    26 |                             key={`${uploadedOn} and  ${url}`}
    27 |                             onClick={() => window.open(url, "_blank")}
  > 28 |                         /> : <AttachmentItem 
       |                               ^^^^^^^^^^^^^^
    29 |                             image={fileType == 'image' && downloadUrl}
    30 |                             IconComponent={FolderOpenOutlined}
    31 |                             title={filename}


ERROR in src/components/Messaging/AttachmentsCard.tsx:28:31

TS2741: Property 'date' is missing in type '{ image: false; IconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }; title: never; subtitle: string; key: string; onClick: () => Window | null; }' but required in type '{ image: any; IconComponent: any; title: any; hoverClass?: string | undefined; subtitle: any; date: any; onClick: any; }'.
    26 |                             key={`${uploadedOn} and  ${url}`}
    27 |                             onClick={() => window.open(url, "_blank")}
  > 28 |                         /> : <AttachmentItem 
       |                               ^^^^^^^^^^^^^^
    29 |                             image={fileType == 'image' && downloadUrl}
    30 |                             IconComponent={FolderOpenOutlined}
    31 |                             title={filename}


ERROR in src/components/Messaging/AttachmentsDialog.tsx:17:28

TS2345: Argument of type '{ id: string; }[]' is not assignable to parameter of type 'SetStateAction<never[]>'.
  Type '{ id: string; }[]' is not assignable to type 'never[]'.
    Type '{ id: string; }' is not assignable to type 'never'.
    15 |                 ...docSnap.data()
    16 |             }))
  > 17 |             setAttachments(attachments)
       |                            ^^^^^^^^^^^
    18 |         })
    19 |     },[roomId])
    20 |


ERROR in src/components/Messaging/AttachmentsDialog.tsx:33:59

TS2741: Property 'date' is missing in type '{ image: never; IconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }; title: never; subtitle: never; key: string; onClick: () => Window | null; }' but required in type '{ image: any; IconComponent: any; title: any; hoverClass?: string | undefined; subtitle: any; date: any; onClick: any; }'.
    31 |                 {attachments.length === 0 ? "Loading..." : null}
    32 |                 {attachments.map(({ attachmentType, url, title, image, downloadUrl, filename, filetype, uploadedOn }) => {
  > 33 |                     return (attachmentType === 'url') ?  <AttachmentItem 
       |                                                           ^^^^^^^^^^^^^^
    34 |                             image={image}
    35 |                             IconComponent={FolderOpenOutlined}
    36 |                             title={title || url}


ERROR in src/components/Messaging/AttachmentsDialog.tsx:40:31

TS2739: Type '{ IconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }; title: never; date: any; key: string; onClick: () => Window | null; }' is missing the following properties from type '{ image: any; IconComponent: any; title: any; hoverClass?: string | undefined; subtitle: any; date: any; onClick: any; }': image, subtitle
    38 |                             key={`${uploadedOn} and  ${url}`}
    39 |                             onClick={() => window.open(url, "_blank")}
  > 40 |                         /> : <AttachmentItem 
       |                               ^^^^^^^^^^^^^^
    41 |                             IconComponent={FolderOpenOutlined}
    42 |                             title={filename}
    43 |                             date={uploadedOn.toDate().toISOString()}


ERROR in src/components/Messaging/AttachmentsDialog.tsx:43:46

TS2339: Property 'toDate' does not exist on type 'never'.
    41 |                             IconComponent={FolderOpenOutlined}
    42 |                             title={filename}
  > 43 |                             date={uploadedOn.toDate().toISOString()}
       |                                              ^^^^^^
    44 |                             key={`${uploadedOn} and  ${downloadUrl}`}
    45 |                             onClick={() => window.open(downloadUrl, "_blank")}
    46 |                         />


ERROR in src/components/Messaging/Chat.tsx:8:26

TS2732: Cannot find module '../../config/badWords.json'. Consider using '--resolveJsonModule' to import module with '.json' extension.
     6 | import { firebase, db, storage, functions } from '../../config/firebase';
     7 | import { useAuth } from '../../hooks/useAuth';
  >  8 | import badWordsList from '../../config/badWords.json';
       |                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     9 | import ChatMessage from './ChatMessage';
    10 | import Loader from '../Loader/Loader';
    11 | import { InView } from 'react-intersection-observer';


ERROR in src/components/Messaging/Chat.tsx:86:28

TS2345: Argument of type 'DocumentData | undefined' is not assignable to parameter of type 'SetStateAction<{}>'.
  Type 'undefined' is not assignable to type 'SetStateAction<{}>'.
    84 |
    85 |                 const snapData = snapshot.data()
  > 86 |                 setRoomDoc(snapData)
       |                            ^^^^^^^^
    87 |                 //If there is a name (it means it is a group chat)
    88 |                 
    89 |                 logEvent('loaded_room',{


ERROR in src/components/Messaging/Chat.tsx:147:46

TS2531: Object is possibly 'null'.
    145 |         snapshot.forEach((message) => {
    146 |             //Update the message's read field for the user to true
  > 147 |             if(!(message.data()?.read || {})[user.uid]){
        |                                              ^^^^
    148 |                 message.ref.update({ [`read.${user.uid}`] : true })
    149 |             } 
    150 |


ERROR in src/components/Messaging/Chat.tsx:148:47

TS2531: Object is possibly 'null'.
    146 |             //Update the message's read field for the user to true
    147 |             if(!(message.data()?.read || {})[user.uid]){
  > 148 |                 message.ref.update({ [`read.${user.uid}`] : true })
        |                                               ^^^^
    149 |             } 
    150 |
    151 |             // filter out any duplicates (from modify/delete events)         


ERROR in src/components/Messaging/Chat.tsx:152:55

TS2339: Property 'id' does not exist on type 'never'.
    150 |
    151 |             // filter out any duplicates (from modify/delete events)         
  > 152 |             messageArray = messageArray.filter(x => x.id !== message.id)
        |                                                       ^^
    153 |             messageArray.push({ id: message.id, ...message.data() })
    154 |         })
    155 |


ERROR in src/components/Messaging/Chat.tsx:153:33

TS2322: Type 'any' is not assignable to type 'never'.
    151 |             // filter out any duplicates (from modify/delete events)         
    152 |             messageArray = messageArray.filter(x => x.id !== message.id)
  > 153 |             messageArray.push({ id: message.id, ...message.data() })
        |                                 ^^
    154 |         })
    155 |
    156 |         // remove post from local array if deleted


ERROR in src/components/Messaging/Chat.tsx:161:59

TS2339: Property 'id' does not exist on type 'never'.
    159 |                 const message = change.doc
    160 |                 //Remove post from our array if it is here
  > 161 |                 messageArray = messageArray.filter(x => x.id !== message.id)
        |                                                           ^^
    162 |             }
    163 |         });
    164 |         


ERROR in src/components/Messaging/Chat.tsx:168:22

TS2339: Property 'toDate' does not exist on type 'never'.
    166 |         //Sort array because it is unsorted, filter date as it might be null
    167 |         messageArray.sort(({ date: x }, { date: y }) => {
  > 168 |             return x.toDate() - y.toDate()
        |                      ^^^^^^
    169 |         })
    170 |         setMessages(messageArray)
    171 |         setMessageLoading(false)


ERROR in src/components/Messaging/Chat.tsx:168:35

TS2339: Property 'toDate' does not exist on type 'never'.
    166 |         //Sort array because it is unsorted, filter date as it might be null
    167 |         messageArray.sort(({ date: x }, { date: y }) => {
  > 168 |             return x.toDate() - y.toDate()
        |                                   ^^^^^^
    169 |         })
    170 |         setMessages(messageArray)
    171 |         setMessageLoading(false)


ERROR in src/components/Messaging/Chat.tsx:182:9

TS2322: Type 'QueryDocumentSnapshot<DocumentData>' is not assignable to type 'null'.
    180 |             .limit(DOCUMENTS_PER_PAGE).get()
    181 |         // save startAt snapshot
  > 182 |         start = snapshots.docs[snapshots.docs.length - 1]
        |         ^^^^^
    183 |
    184 |         let listener;
    185 |


ERROR in src/components/Messaging/Chat.tsx:203:24

TS2345: Argument of type 'any' is not assignable to parameter of type 'never'.
    201 |
    202 |         // add listener to list
  > 203 |         listeners.push(listener)
        |                        ^^^^^^^^
    204 |     }
    205 |
    206 |     async function getMoreMessages() {


ERROR in src/components/Messaging/Chat.tsx:220:9

TS2322: Type 'QueryDocumentSnapshot<DocumentData>' is not assignable to type 'null'.
    218 |         // previous starting boundary becomes new ending boundary
    219 |         end = start
  > 220 |         start = snapshots.docs[snapshots.docs.length - 1]
        |         ^^^^^
    221 |         // create another listener using new boundaries     
    222 |         if (!end) {
    223 |             setLoadedAllMessages(true);


ERROR in src/components/Messaging/Chat.tsx:230:24

TS2345: Argument of type '() => void' is not assignable to parameter of type 'never'.
    228 |             .startAt(start).endBefore(end)
    229 |             .onSnapshot(handleUpdatedMessages)
  > 230 |         listeners.push(listener)
        |                        ^^^^^^^^
    231 |     }
    232 |
    233 |     // call to detach all listeners


ERROR in src/components/Messaging/Chat.tsx:235:39

TS2349: This expression is not callable.
  Type 'never' has no call signatures.
    233 |     // call to detach all listeners
    234 |     function detachListeners() {
  > 235 |         listeners.forEach(listener => listener())
        |                                       ^^^^^^^^
    236 |     }
    237 |
    238 |     const sendMessage = async (e) => {


ERROR in src/components/Messaging/Chat.tsx:255:171

TS2339: Property 'name' does not exist on type 'never'.
    253 |
    254 |                 //Check whether the file is an image
  > 255 |                 const isImage = ((((((((((((((((((((((((((((((((((((((((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)))))))))))))))))))))))))))))))))))))))).test(fileMessages[i].name);
        |                                                                                                                                                                           ^^^^
    256 |
    257 |                 //If image is less than 5MB but bigger than 0.5MB, we compress it down to 0.5MB.
    258 |                 if (isImage && fileMessages[i].size > 500000 && fileMessages[i].size <= 5000000){


ERROR in src/components/Messaging/Chat.tsx:258:48

TS2339: Property 'size' does not exist on type 'never'.
    256 |
    257 |                 //If image is less than 5MB but bigger than 0.5MB, we compress it down to 0.5MB.
  > 258 |                 if (isImage && fileMessages[i].size > 500000 && fileMessages[i].size <= 5000000){
        |                                                ^^^^
    259 |                     const compressedFile = await imageCompression(fileMessages[i], {maxSizeMB: 0.49});
    260 |                     fileMessages[i] = compressedFile;
    261 |                 }


ERROR in src/components/Messaging/Chat.tsx:258:81

TS2339: Property 'size' does not exist on type 'never'.
    256 |
    257 |                 //If image is less than 5MB but bigger than 0.5MB, we compress it down to 0.5MB.
  > 258 |                 if (isImage && fileMessages[i].size > 500000 && fileMessages[i].size <= 5000000){
        |                                                                                 ^^^^
    259 |                     const compressedFile = await imageCompression(fileMessages[i], {maxSizeMB: 0.49});
    260 |                     fileMessages[i] = compressedFile;
    261 |                 }


ERROR in src/components/Messaging/Chat.tsx:260:21

TS2322: Type 'File' is not assignable to type 'never'.
    258 |                 if (isImage && fileMessages[i].size > 500000 && fileMessages[i].size <= 5000000){
    259 |                     const compressedFile = await imageCompression(fileMessages[i], {maxSizeMB: 0.49});
  > 260 |                     fileMessages[i] = compressedFile;
        |                     ^^^^^^^^^^^^^^^
    261 |                 }
    262 |             }
    263 |


ERROR in src/components/Messaging/Chat.tsx:272:95

TS2339: Property 'name' does not exist on type 'never'.
    270 |             //Go through the files here and upload them to storage, keep track of the id. The room should be messageFiles/roomId/
    271 |             const fileMessagesStorageDetails = await Promise.all(fileMessages.map(async (file, index) => {
  > 272 |                 const storagePath = `roomFiles/${roomId}/${fileSendDate.toISOString()}_${file.name}`;
        |                                                                                               ^^^^
    273 |                 const result = await storage.ref(storagePath).put(file);
    274 |                 return { path: storagePath, ref: await result.ref.getDownloadURL() };
    275 |             }))


ERROR in src/components/Messaging/Chat.tsx:279:52

TS2339: Property 'name' does not exist on type 'never'.
    277 |             const attachments = fileMessagesStorageDetails.map((storageDetail, index) => {
    278 |
  > 279 |                 let fileName = fileMessages[index].name;
        |                                                    ^^^^
    280 |
    281 |                 const isImage = ((((((((((((((((((((((((((((((((((((((((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)))))))))))))))))))))))))))))))))))))))).test(fileName);
    282 |


ERROR in src/components/Messaging/Chat.tsx:286:51

TS2339: Property 'size' does not exist on type 'never'.
    284 |                     filename: fileName,
    285 |                     fileType: isImage ? "image" : "others",
  > 286 |                     fileSize: fileMessages[index].size,
        |                                                   ^^^^
    287 |                     bucketPath: storageDetail.path,
    288 |                     uploadedOn: fileSendDate,
    289 |                     downloadUrl: storageDetail.ref,


ERROR in src/components/Messaging/Chat.tsx:293:43

TS2339: Property 'users' does not exist on type '{}'.
    291 |             })
    292 |
  > 293 |             const recipientIds =  roomDoc.users.filter(mod => mod !== user.uid)
        |                                           ^^^^^
    294 |
    295 |             db.collection('rooms').doc(roomId).collection('messages').add({
    296 |                 messageType: "file",


ERROR in src/components/Messaging/Chat.tsx:334:43

TS2339: Property 'users' does not exist on type '{}'.
    332 |             const {read, roomNameObject} = createReadAndRoomName(roomDoc)
    333 |
  > 334 |             const recipientIds =  roomDoc.users.filter(mod => mod !== user.uid)
        |                                           ^^^^^
    335 |
    336 |             db.collection('rooms').doc(roomId).collection('messages').add({
    337 |                 messageType: "text",


ERROR in src/components/Messaging/Chat.tsx:382:18

TS2531: Object is possibly 'null'.
    380 |             const read = {}
    381 |             roomDoc.users.forEach((id) => read[id] = false) //Set all as false
  > 382 |             read[user.uid] = true //then set our current user to true (since we are sending we obv have read it)
        |                  ^^^^
    383 |
    384 |             //Creating roomNameObject object
    385 |             const roomNameObject = {};


ERROR in src/components/Messaging/Chat.tsx:397:32

TS2531: Object is possibly 'null'.
    395 |                 roomDoc.users.forEach((id) => roomNameObject[id] = userDetails.name) 
    396 |                 //We don't want our id to be our own name, we set it to the current roomName (the other user's name)
  > 397 |                 roomNameObject[user.uid] = roomName 
        |                                ^^^^
    398 |             }
    399 |
    400 |


ERROR in src/components/Messaging/Chat.tsx:405:43

TS2339: Property 'current' does not exist on type 'true'.
    403 |
    404 |     useEffect(() => {
  > 405 |         if(newMessageFlag) newMessageFlag.current?.scrollIntoView()
        |                                           ^^^^^^^
    406 |         setNewMessageFlag(false);
    407 |     },[newMessageFlag])
    408 |


ERROR in src/components/Messaging/Chat.tsx:454:33

TS2339: Property 'scrollIntoView' does not exist on type 'never'.
    452 |
    453 |     const scrollToBottom = () => {
  > 454 |         messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
        |                                 ^^^^^^^^^^^^^^
    455 |       }
    456 |     // console.log(messages)
    457 |     return <>


ERROR in src/components/Messaging/Chat.tsx:459:21

TS2322: Type '(() => void) | null' is not assignable to type 'MouseEventHandler<HTMLButtonElement> | undefined'.
  Type 'null' is not assignable to type 'MouseEventHandler<HTMLButtonElement> | undefined'.
    457 |     return <>
    458 |         {showProfPicAndAttachments ? null : <div className="flex flex-1 flex-col overflow-hidden space-y-2 p-2 max-h-full w-full h-app">
  > 459 |             <button onClick={screenSize >= 2 ? null : toggleShowProfPicAndAttachments} className="border-none"> {/* This toggles on and off the prof pic and attachment sections */}
        |                     ^^^^^^^
    460 |                 <div className={`px-5 py-2 flex flex-row items-center bg-white ${screenSize >= 2 ? null : "hover:bg-gray-200"} rounded-lg shadow-lg`}>
    461 |                     {screenSize < 3 ? <Link to={`/messages`} className="mr-5"> <i className="fas fa-arrow-left"></i></Link> : null}
    462 |                     {loading? "Loading...": recipientId ?


ERROR in src/components/Messaging/Chat.tsx:478:18

TS2322: Type '{ as: string; onChange: (inView: boolean, entry: IntersectionObserverEntry) => void; }' is not assignable to type 'IntrinsicAttributes & (IntrinsicClassAttributes<InView> & ((Pick<Readonly<IntersectionObserverProps>, "children" | ... 5 more ... | "delay"> & InexactPartial<...> & InexactPartial<...>) | (Pick<...> & ... 1 more ... & InexactPartial<...>)))'.
  Property 'children' is missing in type '{ as: string; onChange: (inView: boolean, entry: IntersectionObserverEntry) => void; }' but required in type 'Pick<Readonly<PlainChildrenProps>, "children" | "ref" | "cite" | "data" | "form" | "label" | "slot" | "span" | "style" | "summary" | "title" | "pattern" | ... 354 more ... | "tag">'.
    476 |             </button>
    477 |             <div className="py-8 px-2 md:p-8 overflow-auto flex-1 flex flex-col w-full bg-white rounded-lg shadow-lg">
  > 478 |                 <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
        |                  ^^^^^^
    479 |                 {messageLoading && <div className="w-full grid place-items-center"><Loader /></div>}
    480 |                 {roomDoesNotExistWarning && <div className="w-full h-full grid place-items-center text-center"><h1 className="text-red-600">ROOM DOES NOT EXIST, OR YOUR DON'T HAVE ACCESS</h1></div>}
    481 |                 {messages.map(({ messageType, files, message, date, id, senderId, senderUsername }) => (


ERROR in src/components/Messaging/Chat.tsx:478:18

TS2786: 'InView' cannot be used as a JSX component.
  Its instance type 'InView' is not a valid JSX element.
    476 |             </button>
    477 |             <div className="py-8 px-2 md:p-8 overflow-auto flex-1 flex flex-col w-full bg-white rounded-lg shadow-lg">
  > 478 |                 <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
        |                  ^^^^^^
    479 |                 {messageLoading && <div className="w-full grid place-items-center"><Loader /></div>}
    480 |                 {roomDoesNotExistWarning && <div className="w-full h-full grid place-items-center text-center"><h1 className="text-red-600">ROOM DOES NOT EXIST, OR YOUR DON'T HAVE ACCESS</h1></div>}
    481 |                 {messages.map(({ messageType, files, message, date, id, senderId, senderUsername }) => (


ERROR in src/components/Messaging/Chat.tsx:482:47

TS2739: Type '{ key: never; hasFiles: true; files: never; username: never; timestamp: any; isCurrentUser: boolean; }' is missing the following properties from type '{ hasFiles: any; files: any; message: any; username: any; timestamp: any; isCurrentUser: any; isErrorMessage: any; }': message, isErrorMessage
    480 |                 {roomDoesNotExistWarning && <div className="w-full h-full grid place-items-center text-center"><h1 className="text-red-600">ROOM DOES NOT EXIST, OR YOUR DON'T HAVE ACCESS</h1></div>}
    481 |                 {messages.map(({ messageType, files, message, date, id, senderId, senderUsername }) => (
  > 482 |                     messageType === "file" ? <ChatMessage
        |                                               ^^^^^^^^^^^
    483 |                         key={id}
    484 |                         hasFiles
    485 |                         files={files}


ERROR in src/components/Messaging/Chat.tsx:487:41

TS2339: Property 'toMillis' does not exist on type 'never'.
    485 |                         files={files}
    486 |                         username={senderUsername}
  > 487 |                         timestamp={date.toMillis()}
        |                                         ^^^^^^^^
    488 |                         isCurrentUser={senderId === user?.uid}
    489 |                     /> : <ChatMessage
    490 |                         key={id}


ERROR in src/components/Messaging/Chat.tsx:489:27

TS2739: Type '{ key: never; message: any; username: never; timestamp: any; isCurrentUser: boolean; }' is missing the following properties from type '{ hasFiles: any; files: any; message: any; username: any; timestamp: any; isCurrentUser: any; isErrorMessage: any; }': hasFiles, files, isErrorMessage
    487 |                         timestamp={date.toMillis()}
    488 |                         isCurrentUser={senderId === user?.uid}
  > 489 |                     /> : <ChatMessage
        |                           ^^^^^^^^^^^
    490 |                         key={id}
    491 |                         message={filter.isProfane(message) ? filter.clean(message) : message}
    492 |                         username={senderUsername}


ERROR in src/components/Messaging/Chat.tsx:493:41

TS2339: Property 'toMillis' does not exist on type 'never'.
    491 |                         message={filter.isProfane(message) ? filter.clean(message) : message}
    492 |                         username={senderUsername}
  > 493 |                         timestamp={date.toMillis()}
        |                                         ^^^^^^^^
    494 |                         isCurrentUser={senderId === user?.uid} />
    495 |                 ))}
    496 |                 {fileSizeWarning ? <><ChatMessage 


ERROR in src/components/Messaging/Chat.tsx:496:39

TS2739: Type '{ message: string; isCurrentUser: boolean; isErrorMessage: boolean; }' is missing the following properties from type '{ hasFiles: any; files: any; message: any; username: any; timestamp: any; isCurrentUser: any; isErrorMessage: any; }': hasFiles, files, username, timestamp
    494 |                         isCurrentUser={senderId === user?.uid} />
    495 |                 ))}
  > 496 |                 {fileSizeWarning ? <><ChatMessage 
        |                                       ^^^^^^^^^^^
    497 |                     message={"One or more of the files were too large."}
    498 |                     isCurrentUser={true}
    499 |                     isErrorMessage={true}


ERROR in src/components/Messaging/Chat.tsx:501:18

TS2739: Type '{ message: string; isCurrentUser: boolean; isErrorMessage: boolean; }' is missing the following properties from type '{ hasFiles: any; files: any; message: any; username: any; timestamp: any; isCurrentUser: any; isErrorMessage: any; }': hasFiles, files, username, timestamp
    499 |                     isErrorMessage={true}
    500 |                 /> 
  > 501 |                 <ChatMessage 
        |                  ^^^^^^^^^^^
    502 |                     message={"We have imposed a maximum file size of 5MB for files."}
    503 |                     isCurrentUser={true}
    504 |                     isErrorMessage={true}


ERROR in src/components/Messaging/Chat.tsx:519:220

TS2322: Type 'string' is not assignable to type 'number'.
    517 |                         {fileMessages.length > 0 ? <span className="text-sm text-gray-500">{fileMessages.length} files</span> : null}
    518 |                     </div>
  > 519 |                     <TextareaAutosize className="w-full h-full rounded-xl p-2 border-none outline-none resize-none overflow-hidden" value={input} placeholder="Write A Message" onChange={(e) => setInput(e.target.value)} maxRows="10" minRows="2"/>
        |                                                                                                                                                                                                                            ^^^^^^^
    520 |                     <IconButton
    521 |                         className="w-12"
    522 |                         type="submit"


ERROR in src/components/Messaging/Chat.tsx:519:233

TS2322: Type 'string' is not assignable to type 'number'.
    517 |                         {fileMessages.length > 0 ? <span className="text-sm text-gray-500">{fileMessages.length} files</span> : null}
    518 |                     </div>
  > 519 |                     <TextareaAutosize className="w-full h-full rounded-xl p-2 border-none outline-none resize-none overflow-hidden" value={input} placeholder="Write A Message" onChange={(e) => setInput(e.target.value)} maxRows="10" minRows="2"/>
        |                                                                                                                                                                                                                                         ^^^^^^^
    520 |                     <IconButton
    521 |                         className="w-12"
    522 |                         type="submit"


ERROR in src/components/Messaging/Chat.tsx:533:72

TS2339: Property 'attachments' does not exist on type '{}'.
    531 |         <div className={`${screenSize < 2 ? "hidden" : ""} flex flex-col h-app`} style={screenSize < 3 ? {width: '275px'} : {width: '350px'}}>
    532 |             <LazyProfileCard uid={recipientId} roomExists={!roomDoesNotExistWarning}/>
  > 533 |             <LazyAttachmentsCard roomId={roomId} attachments={roomDoc?.attachments} roomExists={!roomDoesNotExistWarning}/>
        |                                                                        ^^^^^^^^^^^
    534 |         </div>
    535 |         {showProfPicAndAttachments ? <div className={`${screenSize >= 2 ? "hidden" : "h-app overflow-auto"}`} style={{minWidth: 'calc(100vw - 260px)'}}>
    536 |             <button onClick={toggleShowProfPicAndAttachments} className="bg-transparent border-none p-5 cursor-pointer"><i className="fas fa-arrow-left text-2xl"></i></button>


ERROR in src/components/Messaging/Chat.tsx:533:85

TS2322: Type '{ roomId: string | undefined; attachments: any; roomExists: boolean; }' is not assignable to type 'IntrinsicAttributes & { roomId: any; attachments?: never[] | undefined; }'.
  Property 'roomExists' does not exist on type 'IntrinsicAttributes & { roomId: any; attachments?: never[] | undefined; }'.
    531 |         <div className={`${screenSize < 2 ? "hidden" : ""} flex flex-col h-app`} style={screenSize < 3 ? {width: '275px'} : {width: '350px'}}>
    532 |             <LazyProfileCard uid={recipientId} roomExists={!roomDoesNotExistWarning}/>
  > 533 |             <LazyAttachmentsCard roomId={roomId} attachments={roomDoc?.attachments} roomExists={!roomDoesNotExistWarning}/>
        |                                                                                     ^^^^^^^^^^
    534 |         </div>
    535 |         {showProfPicAndAttachments ? <div className={`${screenSize >= 2 ? "hidden" : "h-app overflow-auto"}`} style={{minWidth: 'calc(100vw - 260px)'}}>
    536 |             <button onClick={toggleShowProfPicAndAttachments} className="bg-transparent border-none p-5 cursor-pointer"><i className="fas fa-arrow-left text-2xl"></i></button>


ERROR in src/components/Messaging/Chat.tsx:538:72

TS2339: Property 'attachments' does not exist on type '{}'.
    536 |             <button onClick={toggleShowProfPicAndAttachments} className="bg-transparent border-none p-5 cursor-pointer"><i className="fas fa-arrow-left text-2xl"></i></button>
    537 |             <LazyProfileCard uid={recipientId} roomExists={!roomDoesNotExistWarning}/>
  > 538 |             <LazyAttachmentsCard roomId={roomId} attachments={roomDoc?.attachments} roomExists={!roomDoesNotExistWarning}/>
        |                                                                        ^^^^^^^^^^^
    539 |         </div> : null}
    540 |     </>;
    541 | }


ERROR in src/components/Messaging/Chat.tsx:538:85

TS2322: Type '{ roomId: string | undefined; attachments: any; roomExists: boolean; }' is not assignable to type 'IntrinsicAttributes & { roomId: any; attachments?: never[] | undefined; }'.
  Property 'roomExists' does not exist on type 'IntrinsicAttributes & { roomId: any; attachments?: never[] | undefined; }'.
    536 |             <button onClick={toggleShowProfPicAndAttachments} className="bg-transparent border-none p-5 cursor-pointer"><i className="fas fa-arrow-left text-2xl"></i></button>
    537 |             <LazyProfileCard uid={recipientId} roomExists={!roomDoesNotExistWarning}/>
  > 538 |             <LazyAttachmentsCard roomId={roomId} attachments={roomDoc?.attachments} roomExists={!roomDoesNotExistWarning}/>
        |                                                                                     ^^^^^^^^^^
    539 |         </div> : null}
    540 |     </>;
    541 | }


ERROR in src/components/Messaging/ChatMessage.tsx:31:26

TS2739: Type '{ image: any; hoverClass: any; IconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }; title: any; key: any; onClick: () => Window | null; }' is missing the following properties from type '{ image: any; IconComponent: any; title: any; hoverClass?: string | undefined; subtitle: any; date: any; onClick: any; }': subtitle, date
    29 |                 {files.map(({downloadUrl, filename, fileType},index) => {
    30 |                     return (
  > 31 |                         <AttachmentItem 
       |                          ^^^^^^^^^^^^^^
    32 |                             image={fileType === "image" ? downloadUrl : null}
    33 |                             hoverClass={isCurrentUser&&"hover:bg-blue-300 hover:bg-opacity-50"}
    34 |                             IconComponent={FolderOpenOutlined}


ERROR in src/components/Messaging/ProfileCard.tsx:24:40

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    22 |     }, [user, uid, roomExists]);
    23 |
  > 24 |     if(loading || !roomExists) return <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
       |                                        ^^^
    25 |         <h3 className="text-gray-500">{roomExists? "Loading" : "N/A"}</h3>
    26 |     </div> 
    27 |     return <UserSmallProfileCard uid={uid} userDetails={details} />


ERROR in src/components/Messaging/ProfileCard.tsx:25:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    23 |
    24 |     if(loading || !roomExists) return <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
  > 25 |         <h3 className="text-gray-500">{roomExists? "Loading" : "N/A"}</h3>
       |          ^^
    26 |     </div> 
    27 |     return <UserSmallProfileCard uid={uid} userDetails={details} />
    28 | }   


ERROR in src/components/Messaging/ProfileCard.tsx:27:13

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    25 |         <h3 className="text-gray-500">{roomExists? "Loading" : "N/A"}</h3>
    26 |     </div> 
  > 27 |     return <UserSmallProfileCard uid={uid} userDetails={details} />
       |             ^^^^^^^^^^^^^^^^^^^^
    28 | }   
    29 |
    30 | export default ProfileCard


ERROR in src/components/Messaging/Sidebar.tsx:56:26

TS2345: Argument of type '({ id: string; data: DocumentData; name: any; pic: any; isMentor?: undefined; } | { id: string; data: DocumentData; name: any; isMentor: any; pic: string; })[]' is not assignable to parameter of type 'SetStateAction<never[]>'.
  Type '({ id: string; data: DocumentData; name: any; pic: any; isMentor?: undefined; } | { id: string; data: DocumentData; name: any; isMentor: any; pic: string; })[]' is not assignable to type 'never[]'.
    Type '{ id: string; data: DocumentData; name: any; pic: any; isMentor?: undefined; } | { id: string; data: DocumentData; name: any; isMentor: any; pic: string; }' is not assignable to type 'never'.
      Type '{ id: string; data: firebase.firestore.DocumentData; name: any; pic: any; isMentor?: undefined; }' is not assignable to type 'never'.
    54 |                 }
    55 |                 setLoading(false)
  > 56 |                 setRooms(res)
       |                          ^^^
    57 |             })
    58 |             
    59 |         })


ERROR in src/components/Messaging/Sidebar.tsx:83:33

TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
    81 |         <div className="flex flex-col flex-1 rounded-md bg-white m-2 shadow-lg" style={{maxHeight: `${screenSize >= 1 ? "calc(100vh - 20rem)" : "100%"}`}}>
    82 |             <div className="flex justify-between items-center px-4 py-3">
  > 83 |                 <ProfilePicture uid={user?.uid} className="h-8 w-8 rounded-full"/>
       |                                 ^^^
    84 |                 <h1 className="sidebar__headerUsername">{userDetails?.name}</h1>
    85 |             </div>
    86 |             <div className="sidebar__searchContainer">


ERROR in src/components/Messaging/Sidebar.tsx:94:48

TS2339: Property 'name' does not exist on type 'never'.
    92 |             <div className="flex flex-col overflow-y-auto flex-1">
    93 |                 <TransitionGroup>
  > 94 |                     {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => {
       |                                                ^^^^
    95 |                         return <Collapse>
    96 |                             <SidebarChat key={room?.id} id={room?.id} roomName={room.name} isMentor={room.isMentor} roomPic={room.pic} read={(room.data.lastMessage.read || {})[user?.uid] !== false}/>
    97 |                         </Collapse>


ERROR in src/components/Messaging/Sidebar.tsx:96:53

TS2339: Property 'id' does not exist on type 'never'.
    94 |                     {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => {
    95 |                         return <Collapse>
  > 96 |                             <SidebarChat key={room?.id} id={room?.id} roomName={room.name} isMentor={room.isMentor} roomPic={room.pic} read={(room.data.lastMessage.read || {})[user?.uid] !== false}/>
       |                                                     ^^
    97 |                         </Collapse>
    98 |                     })}
    99 |                 </TransitionGroup>


ERROR in src/components/Messaging/Sidebar.tsx:96:57

TS2322: Type '{ key: any; id: any; roomName: any; isMentor: any; roomPic: any; read: boolean; }' is not assignable to type 'IntrinsicAttributes & RefAttributes<unknown>'.
  Property 'id' does not exist on type 'IntrinsicAttributes & RefAttributes<unknown>'.
    94 |                     {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => {
    95 |                         return <Collapse>
  > 96 |                             <SidebarChat key={room?.id} id={room?.id} roomName={room.name} isMentor={room.isMentor} roomPic={room.pic} read={(room.data.lastMessage.read || {})[user?.uid] !== false}/>
       |                                                         ^^
    97 |                         </Collapse>
    98 |                     })}
    99 |                 </TransitionGroup>


ERROR in src/components/Messaging/Sidebar.tsx:96:67

TS2339: Property 'id' does not exist on type 'never'.
    94 |                     {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => {
    95 |                         return <Collapse>
  > 96 |                             <SidebarChat key={room?.id} id={room?.id} roomName={room.name} isMentor={room.isMentor} roomPic={room.pic} read={(room.data.lastMessage.read || {})[user?.uid] !== false}/>
       |                                                                   ^^
    97 |                         </Collapse>
    98 |                     })}
    99 |                 </TransitionGroup>


ERROR in src/components/Messaging/Sidebar.tsx:96:86

TS2339: Property 'name' does not exist on type 'never'.
    94 |                     {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => {
    95 |                         return <Collapse>
  > 96 |                             <SidebarChat key={room?.id} id={room?.id} roomName={room.name} isMentor={room.isMentor} roomPic={room.pic} read={(room.data.lastMessage.read || {})[user?.uid] !== false}/>
       |                                                                                      ^^^^
    97 |                         </Collapse>
    98 |                     })}
    99 |                 </TransitionGroup>


ERROR in src/components/Messaging/Sidebar.tsx:96:107

TS2339: Property 'isMentor' does not exist on type 'never'.
    94 |                     {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => {
    95 |                         return <Collapse>
  > 96 |                             <SidebarChat key={room?.id} id={room?.id} roomName={room.name} isMentor={room.isMentor} roomPic={room.pic} read={(room.data.lastMessage.read || {})[user?.uid] !== false}/>
       |                                                                                                           ^^^^^^^^
    97 |                         </Collapse>
    98 |                     })}
    99 |                 </TransitionGroup>


ERROR in src/components/Messaging/Sidebar.tsx:96:131

TS2339: Property 'pic' does not exist on type 'never'.
    94 |                     {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => {
    95 |                         return <Collapse>
  > 96 |                             <SidebarChat key={room?.id} id={room?.id} roomName={room.name} isMentor={room.isMentor} roomPic={room.pic} read={(room.data.lastMessage.read || {})[user?.uid] !== false}/>
       |                                                                                                                                   ^^^
    97 |                         </Collapse>
    98 |                     })}
    99 |                 </TransitionGroup>


ERROR in src/components/Messaging/Sidebar.tsx:96:148

TS2339: Property 'data' does not exist on type 'never'.
    94 |                     {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => {
    95 |                         return <Collapse>
  > 96 |                             <SidebarChat key={room?.id} id={room?.id} roomName={room.name} isMentor={room.isMentor} roomPic={room.pic} read={(room.data.lastMessage.read || {})[user?.uid] !== false}/>
       |                                                                                                                                                    ^^^^
    97 |                         </Collapse>
    98 |                     })}
    99 |                 </TransitionGroup>


ERROR in src/components/Messaging/Sidebar.tsx:96:177

TS2538: Type 'undefined' cannot be used as an index type.
    94 |                     {rooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase())).map(room => {
    95 |                         return <Collapse>
  > 96 |                             <SidebarChat key={room?.id} id={room?.id} roomName={room.name} isMentor={room.isMentor} roomPic={room.pic} read={(room.data.lastMessage.read || {})[user?.uid] !== false}/>
       |                                                                                                                                                                                 ^^^^^^^^^
    97 |                         </Collapse>
    98 |                     })}
    99 |                 </TransitionGroup>


ERROR in src/components/Messaging/SidebarChat.tsx:9:35

TS2339: Property 'id' does not exist on type '{}'.
     7 | import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
     8 |
  >  9 | const SidebarChat = forwardRef(({ id, roomName, isMentor, roomPic, read }, ref) =>{
       |                                   ^^
    10 |     const { user } = useAuth();
    11 |     const [messages, setMessages] = useState('');
    12 |     const location = useLocation();


ERROR in src/components/Messaging/SidebarChat.tsx:9:39

TS2339: Property 'roomName' does not exist on type '{}'.
     7 | import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
     8 |
  >  9 | const SidebarChat = forwardRef(({ id, roomName, isMentor, roomPic, read }, ref) =>{
       |                                       ^^^^^^^^
    10 |     const { user } = useAuth();
    11 |     const [messages, setMessages] = useState('');
    12 |     const location = useLocation();


ERROR in src/components/Messaging/SidebarChat.tsx:9:49

TS2339: Property 'isMentor' does not exist on type '{}'.
     7 | import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
     8 |
  >  9 | const SidebarChat = forwardRef(({ id, roomName, isMentor, roomPic, read }, ref) =>{
       |                                                 ^^^^^^^^
    10 |     const { user } = useAuth();
    11 |     const [messages, setMessages] = useState('');
    12 |     const location = useLocation();


ERROR in src/components/Messaging/SidebarChat.tsx:9:59

TS2339: Property 'roomPic' does not exist on type '{}'.
     7 | import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
     8 |
  >  9 | const SidebarChat = forwardRef(({ id, roomName, isMentor, roomPic, read }, ref) =>{
       |                                                           ^^^^^^^
    10 |     const { user } = useAuth();
    11 |     const [messages, setMessages] = useState('');
    12 |     const location = useLocation();


ERROR in src/components/Messaging/SidebarChat.tsx:9:68

TS2339: Property 'read' does not exist on type '{}'.
     7 | import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
     8 |
  >  9 | const SidebarChat = forwardRef(({ id, roomName, isMentor, roomPic, read }, ref) =>{
       |                                                                    ^^^^
    10 |     const { user } = useAuth();
    11 |     const [messages, setMessages] = useState('');
    12 |     const location = useLocation();


ERROR in src/components/Messaging/SidebarChat.tsx:17:29

TS2532: Object is possibly 'undefined'.
    15 |         if (id) {
    16 |             return db.collection('rooms').doc(id).onSnapshot(doc => {
  > 17 |                 setMessages(doc.data().lastMessage)
       |                             ^^^^^^^^^^
    18 |             })
    19 |         }
    20 |     }, [id])


ERROR in src/components/Messaging/SidebarChat.tsx:24:18

TS2322: Type 'ForwardedRef<unknown>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
    22 |     return (
    23 |         <Link to={`${id}`}>
  > 24 |             <div ref={ref} className={`flex items-center p-3 pr-5 ${(`/messages/${id}` === location.pathname)?'bg-gray-100':''} transition-colors hover:bg-gray-100`}>
       |                  ^^^
    25 |                 <Avatar src={roomPic}/> {/* Add src={*room_pic*} in the Avatar tag. Room pic defaults to the other user's prof pic if there are
    26 |                 only 2 users, and  the group pic if it is a group chat. <-- Implement this to come from Sidebar and be passed down as a prop */}
    27 |                 <div className="sidebarChat__info">


ERROR in src/components/Messaging/SidebarChat.tsx:29:82

TS2339: Property 'senderId' does not exist on type 'string'.
    27 |                 <div className="sidebarChat__info">
    28 |                     <h2>{roomName} {isMentor ? <i className="fas fa-user-check"></i> : null}</h2> 
  > 29 |                     <p className="text-sm text-gray-600">{messages ? `${messages.senderId === user?.uid?"You: ":""}${messages.message}` : "No Message History"}</p>
       |                                                                                  ^^^^^^^^
    30 |                 </div>
    31 |                 {!read ? <FiberManualRecordIcon style={{color: "#F58B09"}}/> : null}
    32 |             </div>


ERROR in src/components/Messaging/SidebarChat.tsx:29:127

TS2339: Property 'message' does not exist on type 'string'.
    27 |                 <div className="sidebarChat__info">
    28 |                     <h2>{roomName} {isMentor ? <i className="fas fa-user-check"></i> : null}</h2> 
  > 29 |                     <p className="text-sm text-gray-600">{messages ? `${messages.senderId === user?.uid?"You: ":""}${messages.message}` : "No Message History"}</p>
       |                                                                                                                               ^^^^^^^
    30 |                 </div>
    31 |                 {!read ? <FiberManualRecordIcon style={{color: "#F58B09"}}/> : null}
    32 |             </div>


ERROR in src/components/Modal/MentorCardModal.tsx:23:30

TS2339: Property 'palette' does not exist on type 'DefaultTheme'.
    21 |       width: "98vw",
    22 |       maxWidth: "400px",
  > 23 |       backgroundColor: theme.palette.background.paper,
       |                              ^^^^^^^
    24 |       border: '1px solid #000',
    25 |       boxShadow: theme.shadows[5],
    26 |       padding: theme.spacing(2, 4, 3),


ERROR in src/components/Modal/MentorCardModal.tsx:25:24

TS2339: Property 'shadows' does not exist on type 'DefaultTheme'.
    23 |       backgroundColor: theme.palette.background.paper,
    24 |       border: '1px solid #000',
  > 25 |       boxShadow: theme.shadows[5],
       |                        ^^^^^^^
    26 |       padding: theme.spacing(2, 4, 3),
    27 |       display: "flex",
    28 |       justifyContent: "center",


ERROR in src/components/Modal/MentorCardModal.tsx:26:22

TS2339: Property 'spacing' does not exist on type 'DefaultTheme'.
    24 |       border: '1px solid #000',
    25 |       boxShadow: theme.shadows[5],
  > 26 |       padding: theme.spacing(2, 4, 3),
       |                      ^^^^^^^
    27 |       display: "flex",
    28 |       justifyContent: "center",
    29 |       borderRadius: "25px",


ERROR in src/components/Profile/ContactsSidebar.tsx:28:26

TS2345: Argument of type '{ id: string; }[]' is not assignable to parameter of type 'SetStateAction<never[]>'.
  Type '{ id: string; }[]' is not assignable to type 'never[]'.
    Type '{ id: string; }' is not assignable to type 'never'.
    26 |                 return {id: userData.id, ...userData.data()}
    27 |             }));
  > 28 |             setFollowers(list);
       |                          ^^^^
    29 |             setFollowersLoaded(true)
    30 |         })
    31 |     }, [profileId, user?.uid])


ERROR in src/components/Profile/EditBiographyDialog.tsx:42:13

TS2339: Property 'bio' does not exist on type '{}'.
    40 |       onClose();
    41 |     }
  > 42 |     const { bio } = form;
       |             ^^^
    43 |
    44 |     return (
    45 |         <DialogBase open={open} onClose={onClose}>


ERROR in src/components/Profile/EditBiographyDialog.tsx:45:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    43 |
    44 |     return (
  > 45 |         <DialogBase open={open} onClose={onClose}>
       |          ^^^^^^^^^^
    46 |             <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
    47 |                 <Dialog.Title
    48 |                   as="h3"


ERROR in src/components/Profile/EditBiographyDialog.tsx:46:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    44 |     return (
    45 |         <DialogBase open={open} onClose={onClose}>
  > 46 |             <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
       |              ^^^
    47 |                 <Dialog.Title
    48 |                   as="h3"
    49 |                   className="text-xl font-semibold leading-6 text-center text-gray-900"


ERROR in src/components/Profile/EditBiographyDialog.tsx:47:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    45 |         <DialogBase open={open} onClose={onClose}>
    46 |             <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
  > 47 |                 <Dialog.Title
       |                  ^^^^^^^^^^^^
    48 |                   as="h3"
    49 |                   className="text-xl font-semibold leading-6 text-center text-gray-900"
    50 |                 >


ERROR in src/components/Profile/EditBiographyDialog.tsx:53:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    51 |                   Edit Biography
    52 |                 </Dialog.Title>
  > 53 |                 <div className="mt-2 h-full space-y-2 py-2">
       |                  ^^^
    54 |                     <InputAreaField 
    55 |                         style={{ resize: "none"}} 
    56 |                         rows="3" 


ERROR in src/components/Profile/EditBiographyDialog.tsx:54:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    52 |                 </Dialog.Title>
    53 |                 <div className="mt-2 h-full space-y-2 py-2">
  > 54 |                     <InputAreaField 
       |                      ^^^^^^^^^^^^^^
    55 |                         style={{ resize: "none"}} 
    56 |                         rows="3" 
    57 |                         maxLength="300"


ERROR in src/components/Profile/EditBiographyDialog.tsx:56:25

TS2322: Type '{ style: { resize: "none"; }; rows: string; maxLength: string; type: string; className: string; label: string; id: string; name: string; value: any; onChange: (e: any) => void; }' is not assignable to type 'IntrinsicAttributes & { required?: boolean | undefined; label: string; } & HTMLAttributes<HTMLTextAreaElement>'.
  Property 'rows' does not exist on type 'IntrinsicAttributes & { required?: boolean | undefined; label: string; } & HTMLAttributes<HTMLTextAreaElement>'.
    54 |                     <InputAreaField 
    55 |                         style={{ resize: "none"}} 
  > 56 |                         rows="3" 
       |                         ^^^^
    57 |                         maxLength="300"
    58 |                         type="text" 
    59 |                         className="md:w-full mb-6 md:mb-0" 


ERROR in src/components/Profile/EditBiographyDialog.tsx:67:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    65 |
    66 |                 </div>
  > 67 |                 <div className="mt-4 pt-2">
       |                  ^^^
    68 |                   <button
    69 |                     type="button"
    70 |                     className="ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"


ERROR in src/components/Profile/EditBiographyDialog.tsx:68:20

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    66 |                 </div>
    67 |                 <div className="mt-4 pt-2">
  > 68 |                   <button
       |                    ^^^^^^
    69 |                     type="button"
    70 |                     className="ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    71 |                     onClick={handleSaveBio}


ERROR in src/components/Profile/EditBiographyDialog.tsx:73:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    71 |                     onClick={handleSaveBio}
    72 |                   >
  > 73 |                     {saving?<Spinner/>:"Save"}
       |                              ^^^^^^^
    74 |                   </button>
    75 |                   <button
    76 |                     type="button"


ERROR in src/components/Profile/EditBiographyDialog.tsx:75:20

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    73 |                     {saving?<Spinner/>:"Save"}
    74 |                   </button>
  > 75 |                   <button
       |                    ^^^^^^
    76 |                     type="button"
    77 |                     className="inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    78 |                     onClick={onClose}


ERROR in src/components/Profile/EditDetailsDialog.tsx:15:4

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    13 |
    14 | const FormRow = ({ children }) => (
  > 15 |   <div class="flex flex-wrap mb-6">{children}</div>
       |    ^^^
    16 | )
    17 |
    18 | const EditDetailsDialog = ({open, onClose}) => {


ERROR in src/components/Profile/EditDetailsDialog.tsx:15:8

TS2322: Type '{ children: any; class: string; }' is not assignable to type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'.
  Property 'class' does not exist on type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'. Did you mean 'className'?
    13 |
    14 | const FormRow = ({ children }) => (
  > 15 |   <div class="flex flex-wrap mb-6">{children}</div>
       |        ^^^^^
    16 | )
    17 |
    18 | const EditDetailsDialog = ({open, onClose}) => {


ERROR in src/components/Profile/EditDetailsDialog.tsx:33:13

TS2339: Property 'name' does not exist on type '{}'.
    31 |     },[userDetails])
    32 |
  > 33 |     const { name, school, major, country, highlight1, highlight2 } = form;
       |             ^^^^
    34 |     
    35 |     const handleFormChange = (e) => {
    36 |         const { name, value } = e.target;


ERROR in src/components/Profile/EditDetailsDialog.tsx:33:19

TS2339: Property 'school' does not exist on type '{}'.
    31 |     },[userDetails])
    32 |
  > 33 |     const { name, school, major, country, highlight1, highlight2 } = form;
       |                   ^^^^^^
    34 |     
    35 |     const handleFormChange = (e) => {
    36 |         const { name, value } = e.target;


ERROR in src/components/Profile/EditDetailsDialog.tsx:33:27

TS2339: Property 'major' does not exist on type '{}'.
    31 |     },[userDetails])
    32 |
  > 33 |     const { name, school, major, country, highlight1, highlight2 } = form;
       |                           ^^^^^
    34 |     
    35 |     const handleFormChange = (e) => {
    36 |         const { name, value } = e.target;


ERROR in src/components/Profile/EditDetailsDialog.tsx:33:34

TS2339: Property 'country' does not exist on type '{}'.
    31 |     },[userDetails])
    32 |
  > 33 |     const { name, school, major, country, highlight1, highlight2 } = form;
       |                                  ^^^^^^^
    34 |     
    35 |     const handleFormChange = (e) => {
    36 |         const { name, value } = e.target;


ERROR in src/components/Profile/EditDetailsDialog.tsx:33:43

TS2339: Property 'highlight1' does not exist on type '{}'.
    31 |     },[userDetails])
    32 |
  > 33 |     const { name, school, major, country, highlight1, highlight2 } = form;
       |                                           ^^^^^^^^^^
    34 |     
    35 |     const handleFormChange = (e) => {
    36 |         const { name, value } = e.target;


ERROR in src/components/Profile/EditDetailsDialog.tsx:33:55

TS2339: Property 'highlight2' does not exist on type '{}'.
    31 |     },[userDetails])
    32 |
  > 33 |     const { name, school, major, country, highlight1, highlight2 } = form;
       |                                                       ^^^^^^^^^^
    34 |     
    35 |     const handleFormChange = (e) => {
    36 |         const { name, value } = e.target;


ERROR in src/components/Profile/EditDetailsDialog.tsx:75:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    73 |
    74 |     return (
  > 75 |         <DialogBase open={open} onClose={onClose}>
       |          ^^^^^^^^^^
    76 |             <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
    77 |                 <Dialog.Title
    78 |                   as="h3"


ERROR in src/components/Profile/EditDetailsDialog.tsx:76:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    74 |     return (
    75 |         <DialogBase open={open} onClose={onClose}>
  > 76 |             <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
       |              ^^^
    77 |                 <Dialog.Title
    78 |                   as="h3"
    79 |                   className="text-xl font-semibold leading-6 text-center text-gray-900"


ERROR in src/components/Profile/EditDetailsDialog.tsx:77:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    75 |         <DialogBase open={open} onClose={onClose}>
    76 |             <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
  > 77 |                 <Dialog.Title
       |                  ^^^^^^^^^^^^
    78 |                   as="h3"
    79 |                   className="text-xl font-semibold leading-6 text-center text-gray-900"
    80 |                 >


ERROR in src/components/Profile/EditDetailsDialog.tsx:83:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    81 |                   Edit Details
    82 |                 </Dialog.Title>
  > 83 |                 <div className="mt-2 h-full space-y-2 py-2">
       |                  ^^^
    84 |                     <InputField 
    85 |                         required 
    86 |                         type="text" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:84:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    82 |                 </Dialog.Title>
    83 |                 <div className="mt-2 h-full space-y-2 py-2">
  > 84 |                     <InputField 
       |                      ^^^^^^^^^^
    85 |                         required 
    86 |                         type="text" 
    87 |                         className="md:w-full mb-6 md:mb-0" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:92:25

TS2322: Type '{ required: true; type: string; className: string; label: string; placeholder: string; id: string; name: string; value: any; onChange: (e: any) => void; }' is not assignable to type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
  Property 'value' does not exist on type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
    90 |                         id="name" 
    91 |                         name="name" 
  > 92 |                         value={name} 
       |                         ^^^^^
    93 |                         onChange={handleFormChange}/>
    94 |                     <InputField 
    95 |                         required 


ERROR in src/components/Profile/EditDetailsDialog.tsx:94:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    92 |                         value={name} 
    93 |                         onChange={handleFormChange}/>
  > 94 |                     <InputField 
       |                      ^^^^^^^^^^
    95 |                         required 
    96 |                         type="text" 
    97 |                         className="md:w-full mb-6 md:mb-0" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:102:25

TS2322: Type '{ required: true; type: string; className: string; label: string; placeholder: string; id: string; name: string; value: any; onChange: (e: any) => void; }' is not assignable to type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
  Property 'value' does not exist on type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
    100 |                         id="major" 
    101 |                         name="major" 
  > 102 |                         value={major} 
        |                         ^^^^^
    103 |                         onChange={handleFormChange}/>
    104 |                     <InputField 
    105 |                         required 


ERROR in src/components/Profile/EditDetailsDialog.tsx:104:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    102 |                         value={major} 
    103 |                         onChange={handleFormChange}/>
  > 104 |                     <InputField 
        |                      ^^^^^^^^^^
    105 |                         required 
    106 |                         type="text" 
    107 |                         className="md:w-full mb-6 md:mb-0" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:112:25

TS2322: Type '{ required: true; type: string; className: string; label: string; placeholder: string; id: string; name: string; value: any; onChange: (e: any) => void; }' is not assignable to type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
  Property 'value' does not exist on type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
    110 |                         id="school" 
    111 |                         name="school" 
  > 112 |                         value={school} 
        |                         ^^^^^
    113 |                         onChange={handleFormChange}/>
    114 |                     <InputSelect 
    115 |                         required 


ERROR in src/components/Profile/EditDetailsDialog.tsx:114:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    112 |                         value={school} 
    113 |                         onChange={handleFormChange}/>
  > 114 |                     <InputSelect 
        |                      ^^^^^^^^^^^
    115 |                         required 
    116 |                         className="md:w-full mb-6 md:mb-0" 
    117 |                         label="Country of Residence" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:125:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    123 |                         onChange={value => handleSelectInput('country',value)} />
    124 |                     {/* Highlight Edit Section */}
  > 125 |                     <p className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2 px-3" style={{color: "#2596be"}}>
        |                      ^
    126 |                         Give us the two things you are most proud of <span className="text-red-600">*</span>
    127 |                     </p>  
    128 |                     <FormRow>


ERROR in src/components/Profile/EditDetailsDialog.tsx:126:71

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    124 |                     {/* Highlight Edit Section */}
    125 |                     <p className="block titlecase tracking-wide text-gray-700 text-xs font-bold mb-2 px-3" style={{color: "#2596be"}}>
  > 126 |                         Give us the two things you are most proud of <span className="text-red-600">*</span>
        |                                                                       ^^^^
    127 |                     </p>  
    128 |                     <FormRow>
    129 |                       <div className="px-3">


ERROR in src/components/Profile/EditDetailsDialog.tsx:128:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    126 |                         Give us the two things you are most proud of <span className="text-red-600">*</span>
    127 |                     </p>  
  > 128 |                     <FormRow>
        |                      ^^^^^^^
    129 |                       <div className="px-3">
    130 |                           <Button 
    131 |                             variant="outlined" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:129:24

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    127 |                     </p>  
    128 |                     <FormRow>
  > 129 |                       <div className="px-3">
        |                        ^^^
    130 |                           <Button 
    131 |                             variant="outlined" 
    132 |                             style={{height: "40px", width: "40px"}} 


ERROR in src/components/Profile/EditDetailsDialog.tsx:130:28

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    128 |                     <FormRow>
    129 |                       <div className="px-3">
  > 130 |                           <Button 
        |                            ^^^^^^
    131 |                             variant="outlined" 
    132 |                             style={{height: "40px", width: "40px"}} 
    133 |                             id="highlight1Emoji"


ERROR in src/components/Profile/EditDetailsDialog.tsx:139:39

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    137 |                           </Button>
    138 |                       </div>
  > 139 |                       {showPicker1 ? <Picker onEmojiClick={handleHighlight1Emoji} pickerStyle={{ zIndex:1, position:"absolute",left: "105px", bottom: "35px" }} /> : null}
        |                                       ^^^^^^
    140 |                       <InputField 
    141 |                         required 
    142 |                         type="text" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:139:98

TS2322: Type 'number' is not assignable to type 'string'.
    137 |                           </Button>
    138 |                       </div>
  > 139 |                       {showPicker1 ? <Picker onEmojiClick={handleHighlight1Emoji} pickerStyle={{ zIndex:1, position:"absolute",left: "105px", bottom: "35px" }} /> : null}
        |                                                                                                  ^^^^^^
    140 |                       <InputField 
    141 |                         required 
    142 |                         type="text" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:140:24

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    138 |                       </div>
    139 |                       {showPicker1 ? <Picker onEmojiClick={handleHighlight1Emoji} pickerStyle={{ zIndex:1, position:"absolute",left: "105px", bottom: "35px" }} /> : null}
  > 140 |                       <InputField 
        |                        ^^^^^^^^^^
    141 |                         required 
    142 |                         type="text" 
    143 |                         className="md:w-3/4 mb-6 md:mb-0" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:148:25

TS2322: Type '{ required: true; type: string; className: string; autoWidth: true; placeholder: string; id: string; name: string; value: any; onChange: (e: FormEvent<HTMLInputElement>) => void; }' is not assignable to type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
  Property 'value' does not exist on type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
    146 |                         id="highlight2" 
    147 |                         name="highlight2" 
  > 148 |                         value={highlight1?.description}
        |                         ^^^^^
    149 |                         onChange={(e) => setForm({...form, highlight1: {emoji: highlight1?.emoji, description: e.target.value}})}
    150 |                       />                      
    151 |                     </FormRow>


ERROR in src/components/Profile/EditDetailsDialog.tsx:149:121

TS2339: Property 'value' does not exist on type 'EventTarget'.
    147 |                         name="highlight2" 
    148 |                         value={highlight1?.description}
  > 149 |                         onChange={(e) => setForm({...form, highlight1: {emoji: highlight1?.emoji, description: e.target.value}})}
        |                                                                                                                         ^^^^^
    150 |                       />                      
    151 |                     </FormRow>
    152 |                     <FormRow>


ERROR in src/components/Profile/EditDetailsDialog.tsx:152:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    150 |                       />                      
    151 |                     </FormRow>
  > 152 |                     <FormRow>
        |                      ^^^^^^^
    153 |                       <div className="px-3">
    154 |                           <Button 
    155 |                             variant="outlined" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:153:24

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    151 |                     </FormRow>
    152 |                     <FormRow>
  > 153 |                       <div className="px-3">
        |                        ^^^
    154 |                           <Button 
    155 |                             variant="outlined" 
    156 |                             style={{height: "40px", width: "40px"}} 


ERROR in src/components/Profile/EditDetailsDialog.tsx:154:28

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    152 |                     <FormRow>
    153 |                       <div className="px-3">
  > 154 |                           <Button 
        |                            ^^^^^^
    155 |                             variant="outlined" 
    156 |                             style={{height: "40px", width: "40px"}} 
    157 |                             id="highlight1Emoji" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:163:39

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    161 |                           </Button>
    162 |                       </div>
  > 163 |                       {showPicker2 ? <Picker onEmojiClick={handleHighlight2Emoji} pickerStyle={{ zIndex:1, position:"absolute", left: "105px", bottom: "12px" }} /> : null}
        |                                       ^^^^^^
    164 |                       <InputField 
    165 |                         required 
    166 |                         type="text" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:163:98

TS2322: Type 'number' is not assignable to type 'string'.
    161 |                           </Button>
    162 |                       </div>
  > 163 |                       {showPicker2 ? <Picker onEmojiClick={handleHighlight2Emoji} pickerStyle={{ zIndex:1, position:"absolute", left: "105px", bottom: "12px" }} /> : null}
        |                                                                                                  ^^^^^^
    164 |                       <InputField 
    165 |                         required 
    166 |                         type="text" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:164:24

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    162 |                       </div>
    163 |                       {showPicker2 ? <Picker onEmojiClick={handleHighlight2Emoji} pickerStyle={{ zIndex:1, position:"absolute", left: "105px", bottom: "12px" }} /> : null}
  > 164 |                       <InputField 
        |                        ^^^^^^^^^^
    165 |                         required 
    166 |                         type="text" 
    167 |                         className="md:w-3/4 mb-6 md:mb-0" 


ERROR in src/components/Profile/EditDetailsDialog.tsx:172:25

TS2322: Type '{ required: true; type: string; className: string; autoWidth: true; placeholder: string; id: string; name: string; value: any; onChange: (e: FormEvent<HTMLInputElement>) => void; }' is not assignable to type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
  Property 'value' does not exist on type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
    170 |                         id="highlight2" 
    171 |                         name="highlight2" 
  > 172 |                         value={highlight2?.description}
        |                         ^^^^^
    173 |                         onChange={(e) => setForm({...form, highlight2: {emoji: highlight2?.emoji, description: e.target.value}})}
    174 |                       />                      
    175 |                     </FormRow>


ERROR in src/components/Profile/EditDetailsDialog.tsx:173:121

TS2339: Property 'value' does not exist on type 'EventTarget'.
    171 |                         name="highlight2" 
    172 |                         value={highlight2?.description}
  > 173 |                         onChange={(e) => setForm({...form, highlight2: {emoji: highlight2?.emoji, description: e.target.value}})}
        |                                                                                                                         ^^^^^
    174 |                       />                      
    175 |                     </FormRow>
    176 |                 </div>


ERROR in src/components/Profile/EditDetailsDialog.tsx:177:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    175 |                     </FormRow>
    176 |                 </div>
  > 177 |                 <div className="mt-4 pt-2">
        |                  ^^^
    178 |                   <button
    179 |                     type="button"
    180 |                     className="cursor-pointer ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"


ERROR in src/components/Profile/EditDetailsDialog.tsx:178:20

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    176 |                 </div>
    177 |                 <div className="mt-4 pt-2">
  > 178 |                   <button
        |                    ^^^^^^
    179 |                     type="button"
    180 |                     className="cursor-pointer ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    181 |                     onClick={handleSaveDetails}


ERROR in src/components/Profile/EditDetailsDialog.tsx:183:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    181 |                     onClick={handleSaveDetails}
    182 |                   >
  > 183 |                     {saving?<Spinner/>:"Save"}
        |                              ^^^^^^^
    184 |                   </button>
    185 |                   <button
    186 |                     type="button"


ERROR in src/components/Profile/EditDetailsDialog.tsx:185:20

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    183 |                     {saving?<Spinner/>:"Save"}
    184 |                   </button>
  > 185 |                   <button
        |                    ^^^^^^
    186 |                     type="button"
    187 |                     className="cursor-pointer inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    188 |                     onClick={onClose}


ERROR in src/components/Profile/EditSocialsDialog.tsx:21:13

TS2339: Property 'github' does not exist on type '{}'.
    19 |     },[userDetails])
    20 |
  > 21 |     const { github, youtube, personal } = form || {};
       |             ^^^^^^
    22 |     
    23 |     const handleFormChange = (e) => {
    24 |         const { name, value } = e.target;


ERROR in src/components/Profile/EditSocialsDialog.tsx:21:21

TS2339: Property 'youtube' does not exist on type '{}'.
    19 |     },[userDetails])
    20 |
  > 21 |     const { github, youtube, personal } = form || {};
       |                     ^^^^^^^
    22 |     
    23 |     const handleFormChange = (e) => {
    24 |         const { name, value } = e.target;


ERROR in src/components/Profile/EditSocialsDialog.tsx:21:30

TS2339: Property 'personal' does not exist on type '{}'.
    19 |     },[userDetails])
    20 |
  > 21 |     const { github, youtube, personal } = form || {};
       |                              ^^^^^^^^
    22 |     
    23 |     const handleFormChange = (e) => {
    24 |         const { name, value } = e.target;


ERROR in src/components/Profile/EditSocialsDialog.tsx:46:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    44 |
    45 |     return (
  > 46 |         <DialogBase open={open} onClose={onClose}>
       |          ^^^^^^^^^^
    47 |             <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
    48 |                 <Dialog.Title
    49 |                   as="h3"


ERROR in src/components/Profile/EditSocialsDialog.tsx:47:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    45 |     return (
    46 |         <DialogBase open={open} onClose={onClose}>
  > 47 |             <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
       |              ^^^
    48 |                 <Dialog.Title
    49 |                   as="h3"
    50 |                   className="text-xl font-semibold leading-6 text-center text-gray-900"


ERROR in src/components/Profile/EditSocialsDialog.tsx:48:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    46 |         <DialogBase open={open} onClose={onClose}>
    47 |             <div className="space-y-2 inline-block w-full max-w-lg p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg max-h-screen overflow-y-auto">
  > 48 |                 <Dialog.Title
       |                  ^^^^^^^^^^^^
    49 |                   as="h3"
    50 |                   className="text-xl font-semibold leading-6 text-center text-gray-900"
    51 |                 >


ERROR in src/components/Profile/EditSocialsDialog.tsx:54:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    52 |                   Edit Details
    53 |                 </Dialog.Title>
  > 54 |                 <div className="mt-2 h-full space-y-2 py-2">
       |                  ^^^
    55 |                     <InputField 
    56 |                         type="text" 
    57 |                         className="md:w-full mb-6 md:mb-0" 


ERROR in src/components/Profile/EditSocialsDialog.tsx:55:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    53 |                 </Dialog.Title>
    54 |                 <div className="mt-2 h-full space-y-2 py-2">
  > 55 |                     <InputField 
       |                      ^^^^^^^^^^
    56 |                         type="text" 
    57 |                         className="md:w-full mb-6 md:mb-0" 
    58 |                         label="Personal Website Link" 


ERROR in src/components/Profile/EditSocialsDialog.tsx:61:25

TS2322: Type '{ type: string; className: string; label: string; id: string; name: string; value: any; onChange: (e: any) => void; }' is not assignable to type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
  Property 'value' does not exist on type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
    59 |                         id="personal" 
    60 |                         name="personal" 
  > 61 |                         value={personal} 
       |                         ^^^^^
    62 |                         onChange={handleFormChange}/>
    63 |                     <InputField 
    64 |                         type="text" 


ERROR in src/components/Profile/EditSocialsDialog.tsx:63:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    61 |                         value={personal} 
    62 |                         onChange={handleFormChange}/>
  > 63 |                     <InputField 
       |                      ^^^^^^^^^^
    64 |                         type="text" 
    65 |                         className="md:w-full mb-6 md:mb-0" 
    66 |                         label="Youtube" 


ERROR in src/components/Profile/EditSocialsDialog.tsx:69:25

TS2322: Type '{ type: string; className: string; label: string; id: string; name: string; value: any; onChange: (e: any) => void; }' is not assignable to type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
  Property 'value' does not exist on type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
    67 |                         id="youtube" 
    68 |                         name="youtube" 
  > 69 |                         value={youtube} 
       |                         ^^^^^
    70 |                         onChange={handleFormChange}/>
    71 |                     <InputField 
    72 |                         type="text" 


ERROR in src/components/Profile/EditSocialsDialog.tsx:71:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    69 |                         value={youtube} 
    70 |                         onChange={handleFormChange}/>
  > 71 |                     <InputField 
       |                      ^^^^^^^^^^
    72 |                         type="text" 
    73 |                         className="md:w-full mb-6 md:mb-0" 
    74 |                         label="Github" 


ERROR in src/components/Profile/EditSocialsDialog.tsx:77:25

TS2322: Type '{ type: string; className: string; label: string; id: string; name: string; value: any; onChange: (e: any) => void; }' is not assignable to type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
  Property 'value' does not exist on type 'IntrinsicAttributes & { label: string; required?: boolean | undefined; autoWidth?: boolean | undefined; type?: string | undefined; name?: string | undefined; } & HTMLAttributes<...> & RefAttributes<...>'.
    75 |                         id="github" 
    76 |                         name="github" 
  > 77 |                         value={github} 
       |                         ^^^^^
    78 |                         onChange={handleFormChange}/>
    79 |
    80 |                 </div>


ERROR in src/components/Profile/EditSocialsDialog.tsx:81:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    79 |
    80 |                 </div>
  > 81 |                 <div className="mt-4 pt-2">
       |                  ^^^
    82 |                   <button
    83 |                     type="button"
    84 |                     className="ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"


ERROR in src/components/Profile/EditSocialsDialog.tsx:82:20

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    80 |                 </div>
    81 |                 <div className="mt-4 pt-2">
  > 82 |                   <button
       |                    ^^^^^^
    83 |                     type="button"
    84 |                     className="ml-2 inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    85 |                     onClick={handleSaveDetails}


ERROR in src/components/Profile/EditSocialsDialog.tsx:87:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    85 |                     onClick={handleSaveDetails}
    86 |                   >
  > 87 |                     {saving?<Spinner/>:"Save"}
       |                              ^^^^^^^
    88 |                   </button>
    89 |                   <button
    90 |                     type="button"


ERROR in src/components/Profile/EditSocialsDialog.tsx:89:20

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    87 |                     {saving?<Spinner/>:"Save"}
    88 |                   </button>
  > 89 |                   <button
       |                    ^^^^^^
    90 |                     type="button"
    91 |                     className="inline-flex justify-center px-4 py-2 float-right text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    92 |                     onClick={onClose}


ERROR in src/components/Profile/EducationCard.tsx:4:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    2 |     const { name, major, school } = userDetails || {};
    3 |     return (
  > 4 |         <div className="flex flex-col p-3 m-2 shadow-lg rounded-md bg-white space-y-3">
      |          ^^^
    5 |         <h3 className="font-semibold text-lg">{isUser?"Your":`${name}'s`} Education</h3>
    6 |         <div className="flex flex-row items-center space-x-2">
    7 |             <p className="text-4xl w-16 text-center">🏫</p>


ERROR in src/components/Profile/EducationCard.tsx:5:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    3 |     return (
    4 |         <div className="flex flex-col p-3 m-2 shadow-lg rounded-md bg-white space-y-3">
  > 5 |         <h3 className="font-semibold text-lg">{isUser?"Your":`${name}'s`} Education</h3>
      |          ^^
    6 |         <div className="flex flex-row items-center space-x-2">
    7 |             <p className="text-4xl w-16 text-center">🏫</p>
    8 |             <div className="space-y-2">


ERROR in src/components/Profile/EducationCard.tsx:6:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    4 |         <div className="flex flex-col p-3 m-2 shadow-lg rounded-md bg-white space-y-3">
    5 |         <h3 className="font-semibold text-lg">{isUser?"Your":`${name}'s`} Education</h3>
  > 6 |         <div className="flex flex-row items-center space-x-2">
      |          ^^^
    7 |             <p className="text-4xl w-16 text-center">🏫</p>
    8 |             <div className="space-y-2">
    9 |                 <h3>{major}</h3>


ERROR in src/components/Profile/EducationCard.tsx:7:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     5 |         <h3 className="font-semibold text-lg">{isUser?"Your":`${name}'s`} Education</h3>
     6 |         <div className="flex flex-row items-center space-x-2">
  >  7 |             <p className="text-4xl w-16 text-center">🏫</p>
       |              ^
     8 |             <div className="space-y-2">
     9 |                 <h3>{major}</h3>
    10 |                 <p>{school}</p>


ERROR in src/components/Profile/EducationCard.tsx:8:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     6 |         <div className="flex flex-row items-center space-x-2">
     7 |             <p className="text-4xl w-16 text-center">🏫</p>
  >  8 |             <div className="space-y-2">
       |              ^^^
     9 |                 <h3>{major}</h3>
    10 |                 <p>{school}</p>
    11 |             </div>


ERROR in src/components/Profile/EducationCard.tsx:9:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     7 |             <p className="text-4xl w-16 text-center">🏫</p>
     8 |             <div className="space-y-2">
  >  9 |                 <h3>{major}</h3>
       |                  ^^
    10 |                 <p>{school}</p>
    11 |             </div>
    12 |         </div>


ERROR in src/components/Profile/EducationCard.tsx:10:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     8 |             <div className="space-y-2">
     9 |                 <h3>{major}</h3>
  > 10 |                 <p>{school}</p>
       |                  ^
    11 |             </div>
    12 |         </div>
    13 |     </div>)


ERROR in src/components/Profile/ProfilePostStream.tsx:44:51

TS2339: Property 'id' does not exist on type 'never'.
    42 |         snapshot.forEach((message) => {
    43 |             // filter out any duplicates (from modify/delete events)         
  > 44 |             postsArray = postsArray.filter(x => x.id !== message.id)
       |                                                   ^^
    45 |             postsArray.push({ id: message.id, ...message.data() })
    46 |         })
    47 |


ERROR in src/components/Profile/ProfilePostStream.tsx:45:31

TS2322: Type 'any' is not assignable to type 'never'.
    43 |             // filter out any duplicates (from modify/delete events)         
    44 |             postsArray = postsArray.filter(x => x.id !== message.id)
  > 45 |             postsArray.push({ id: message.id, ...message.data() })
       |                               ^^
    46 |         })
    47 |
    48 |         // remove post from local array if deleted


ERROR in src/components/Profile/ProfilePostStream.tsx:53:55

TS2339: Property 'id' does not exist on type 'never'.
    51 |                 const message = change.doc
    52 |                 //Remove post from our array if it is here
  > 53 |                 postsArray = postsArray.filter(x => x.id !== message.id)
       |                                                       ^^
    54 |             }
    55 |         });
    56 |


ERROR in src/components/Profile/ProfilePostStream.tsx:59:22

TS2339: Property 'toDate' does not exist on type 'never'.
    57 |         //Sort array because it is unsorted
    58 |         postsArray.sort(({ _createdOn: x }, { _createdOn: y }) => {
  > 59 |             return y.toDate() - x.toDate()
       |                      ^^^^^^
    60 |         })
    61 |
    62 |         setStreamPosts(postsArray)


ERROR in src/components/Profile/ProfilePostStream.tsx:59:35

TS2339: Property 'toDate' does not exist on type 'never'.
    57 |         //Sort array because it is unsorted
    58 |         postsArray.sort(({ _createdOn: x }, { _createdOn: y }) => {
  > 59 |             return y.toDate() - x.toDate()
       |                                   ^^^^^^
    60 |         })
    61 |
    62 |         setStreamPosts(postsArray)


ERROR in src/components/Profile/ProfilePostStream.tsx:74:9

TS2322: Type 'QueryDocumentSnapshot<DocumentData>' is not assignable to type 'null'.
    72 |             .limit(DOCUMENTS_PER_PAGE))
    73 |         // save startAt snapshot
  > 74 |         end = snapshots.docs[snapshots.docs.length - 1]
       |         ^^^
    75 |         // create listener using startAt snapshot (starting boundary)   
    76 |         const query = end?ref.orderBy('_createdOn', 'desc').endAt(end):ref.orderBy('_createdOn', 'desc')
    77 |         let listener = query.onSnapshot(handleUpdatedPosts)


ERROR in src/components/Profile/ProfilePostStream.tsx:79:24

TS2345: Argument of type '() => void' is not assignable to parameter of type 'never'.
    77 |         let listener = query.onSnapshot(handleUpdatedPosts)
    78 |         // add listener to list
  > 79 |         listeners.push(listener)
       |                        ^^^^^^^^
    80 |     }
    81 |
    82 |     async function getMoreMessages() {


ERROR in src/components/Profile/ProfilePostStream.tsx:97:9

TS2322: Type 'QueryDocumentSnapshot<DocumentData>' is not assignable to type 'null'.
     95 |         // previous starting boundary becomes new ending boundary
     96 |         start = end
  >  97 |         end = snapshots.docs[snapshots.docs.length - 1]
        |         ^^^
     98 |         // create another listener using new boundaries     
     99 |         if (!end) {
    100 |             setLoadedAllPosts(true);


ERROR in src/components/Profile/ProfilePostStream.tsx:107:24

TS2345: Argument of type '() => void' is not assignable to parameter of type 'never'.
    105 |             .endAt(end).startAfter(start)
    106 |             .onSnapshot(handleUpdatedPosts)
  > 107 |         listeners.push(listener)
        |                        ^^^^^^^^
    108 |     }
    109 |
    110 |     // call to detach all listeners


ERROR in src/components/Profile/ProfilePostStream.tsx:112:39

TS2349: This expression is not callable.
  Type 'never' has no call signatures.
    110 |     // call to detach all listeners
    111 |     function detachListeners() {
  > 112 |         listeners.forEach(listener => listener())
        |                                       ^^^^^^^^
    113 |     }
    114 |
    115 |     return (


ERROR in src/components/Profile/ProfilePostStream.tsx:116:9

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    114 |
    115 |     return (
  > 116 |         <>
        |         ^^
    117 |             {streamPosts.length > 0 ? <p className="font-semibold text-lg">{isUser?"Your":name +"'s"} Posts</p> : <p className="font-semibold text-gray-600 text-lg text-center w-full">
    118 |                 {isUser?"You haven't":`${name} hasn't`}  made any posts yet!
    119 |             </p>}


ERROR in src/components/Profile/ProfilePostStream.tsx:117:40

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    115 |     return (
    116 |         <>
  > 117 |             {streamPosts.length > 0 ? <p className="font-semibold text-lg">{isUser?"Your":name +"'s"} Posts</p> : <p className="font-semibold text-gray-600 text-lg text-center w-full">
        |                                        ^
    118 |                 {isUser?"You haven't":`${name} hasn't`}  made any posts yet!
    119 |             </p>}
    120 |             <div className="space-y-2">


ERROR in src/components/Profile/ProfilePostStream.tsx:117:116

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    115 |     return (
    116 |         <>
  > 117 |             {streamPosts.length > 0 ? <p className="font-semibold text-lg">{isUser?"Your":name +"'s"} Posts</p> : <p className="font-semibold text-gray-600 text-lg text-center w-full">
        |                                                                                                                    ^
    118 |                 {isUser?"You haven't":`${name} hasn't`}  made any posts yet!
    119 |             </p>}
    120 |             <div className="space-y-2">


ERROR in src/components/Profile/ProfilePostStream.tsx:120:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    118 |                 {isUser?"You haven't":`${name} hasn't`}  made any posts yet!
    119 |             </p>}
  > 120 |             <div className="space-y-2">
        |              ^^^
    121 |                 {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
    122 |                 {loading && <PostLoader/>}
    123 |                 <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />


ERROR in src/components/Profile/ProfilePostStream.tsx:121:43

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    119 |             </p>}
    120 |             <div className="space-y-2">
  > 121 |                 {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
        |                                           ^^^^^^^^
    122 |                 {loading && <PostLoader/>}
    123 |                 <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
    124 |             </div>


ERROR in src/components/Profile/ProfilePostStream.tsx:121:62

TS2339: Property 'id' does not exist on type 'never'.
    119 |             </p>}
    120 |             <div className="space-y-2">
  > 121 |                 {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
        |                                                              ^^
    122 |                 {loading && <PostLoader/>}
    123 |                 <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
    124 |             </div>


ERROR in src/components/Profile/ProfilePostStream.tsx:122:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    120 |             <div className="space-y-2">
    121 |                 {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
  > 122 |                 {loading && <PostLoader/>}
        |                              ^^^^^^^^^^
    123 |                 <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
    124 |             </div>
    125 |         </>


ERROR in src/components/Profile/ProfilePostStream.tsx:123:18

TS2322: Type '{ as: string; onChange: (inView: boolean, entry: IntersectionObserverEntry) => void; }' is not assignable to type 'IntrinsicAttributes & (IntrinsicClassAttributes<InView> & ((Pick<Readonly<IntersectionObserverProps>, "children" | ... 5 more ... | "delay"> & InexactPartial<...> & InexactPartial<...>) | (Pick<...> & ... 1 more ... & InexactPartial<...>)))'.
  Property 'children' is missing in type '{ as: string; onChange: (inView: boolean, entry: IntersectionObserverEntry) => void; }' but required in type 'Pick<Readonly<PlainChildrenProps>, "children" | "ref" | "cite" | "data" | "form" | "label" | "slot" | "span" | "style" | "summary" | "title" | "pattern" | ... 354 more ... | "tag">'.
    121 |                 {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
    122 |                 {loading && <PostLoader/>}
  > 123 |                 <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
        |                  ^^^^^^
    124 |             </div>
    125 |         </>
    126 |     );


ERROR in src/components/Profile/ProfilePostStream.tsx:123:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    121 |                 {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
    122 |                 {loading && <PostLoader/>}
  > 123 |                 <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
        |                  ^^^^^^
    124 |             </div>
    125 |         </>
    126 |     );


ERROR in src/components/Profile/ProfilePostStream.tsx:123:18

TS2786: 'InView' cannot be used as a JSX component.
  Its instance type 'InView' is not a valid JSX element.
    121 |                 {streamPosts.map(post => <PostCard key={post.id} post={post}/>)}
    122 |                 {loading && <PostLoader/>}
  > 123 |                 <InView as="div" onChange={(inView, entry) => { if (inView && !loading) getMoreMessages() }} />
        |                  ^^^^^^
    124 |             </div>
    125 |         </>
    126 |     );


ERROR in src/components/Profile/UserFullProfile.tsx:40:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    38 |
    39 |     return (
  > 40 |         <div className="relative">
       |          ^^^
    41 |             <ProfilePicture className="w-24 h-24 md:w-32 md:h-32 rounded-full border-white border-8 border-solid shadow-lg transform -translate-y-16 mx-1" uid={profileId} forceRefresh/>
    42 |             <input ref={profileUpload} type="file" name="file" accept="image/*" onChange={({ target }) => handleUploadProfilePic(target.files[0])} hidden />
    43 |             {isUser && <div className="absolute top-0 right-0 text-white transform -translate-y-16 rounded-full bg-gray-800 scale-75">


ERROR in src/components/Profile/UserFullProfile.tsx:41:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    39 |     return (
    40 |         <div className="relative">
  > 41 |             <ProfilePicture className="w-24 h-24 md:w-32 md:h-32 rounded-full border-white border-8 border-solid shadow-lg transform -translate-y-16 mx-1" uid={profileId} forceRefresh/>
       |              ^^^^^^^^^^^^^^
    42 |             <input ref={profileUpload} type="file" name="file" accept="image/*" onChange={({ target }) => handleUploadProfilePic(target.files[0])} hidden />
    43 |             {isUser && <div className="absolute top-0 right-0 text-white transform -translate-y-16 rounded-full bg-gray-800 scale-75">
    44 |                 <IconButton onClick={e => profileUpload.current.click()} size="large">


ERROR in src/components/Profile/UserFullProfile.tsx:42:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    40 |         <div className="relative">
    41 |             <ProfilePicture className="w-24 h-24 md:w-32 md:h-32 rounded-full border-white border-8 border-solid shadow-lg transform -translate-y-16 mx-1" uid={profileId} forceRefresh/>
  > 42 |             <input ref={profileUpload} type="file" name="file" accept="image/*" onChange={({ target }) => handleUploadProfilePic(target.files[0])} hidden />
       |              ^^^^^
    43 |             {isUser && <div className="absolute top-0 right-0 text-white transform -translate-y-16 rounded-full bg-gray-800 scale-75">
    44 |                 <IconButton onClick={e => profileUpload.current.click()} size="large">
    45 |                     <EditOutlined className="text-white" />


ERROR in src/components/Profile/UserFullProfile.tsx:42:20

TS2322: Type 'MutableRefObject<undefined>' is not assignable to type 'LegacyRef<HTMLInputElement> | undefined'.
  Type 'MutableRefObject<undefined>' is not assignable to type 'RefObject<HTMLInputElement>'.
    Types of property 'current' are incompatible.
      Type 'undefined' is not assignable to type 'HTMLInputElement | null'.
    40 |         <div className="relative">
    41 |             <ProfilePicture className="w-24 h-24 md:w-32 md:h-32 rounded-full border-white border-8 border-solid shadow-lg transform -translate-y-16 mx-1" uid={profileId} forceRefresh/>
  > 42 |             <input ref={profileUpload} type="file" name="file" accept="image/*" onChange={({ target }) => handleUploadProfilePic(target.files[0])} hidden />
       |                    ^^^
    43 |             {isUser && <div className="absolute top-0 right-0 text-white transform -translate-y-16 rounded-full bg-gray-800 scale-75">
    44 |                 <IconButton onClick={e => profileUpload.current.click()} size="large">
    45 |                     <EditOutlined className="text-white" />


ERROR in src/components/Profile/UserFullProfile.tsx:42:130

TS2531: Object is possibly 'null'.
    40 |         <div className="relative">
    41 |             <ProfilePicture className="w-24 h-24 md:w-32 md:h-32 rounded-full border-white border-8 border-solid shadow-lg transform -translate-y-16 mx-1" uid={profileId} forceRefresh/>
  > 42 |             <input ref={profileUpload} type="file" name="file" accept="image/*" onChange={({ target }) => handleUploadProfilePic(target.files[0])} hidden />
       |                                                                                                                                  ^^^^^^^^^^^^
    43 |             {isUser && <div className="absolute top-0 right-0 text-white transform -translate-y-16 rounded-full bg-gray-800 scale-75">
    44 |                 <IconButton onClick={e => profileUpload.current.click()} size="large">
    45 |                     <EditOutlined className="text-white" />


ERROR in src/components/Profile/UserFullProfile.tsx:43:25

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    41 |             <ProfilePicture className="w-24 h-24 md:w-32 md:h-32 rounded-full border-white border-8 border-solid shadow-lg transform -translate-y-16 mx-1" uid={profileId} forceRefresh/>
    42 |             <input ref={profileUpload} type="file" name="file" accept="image/*" onChange={({ target }) => handleUploadProfilePic(target.files[0])} hidden />
  > 43 |             {isUser && <div className="absolute top-0 right-0 text-white transform -translate-y-16 rounded-full bg-gray-800 scale-75">
       |                         ^^^
    44 |                 <IconButton onClick={e => profileUpload.current.click()} size="large">
    45 |                     <EditOutlined className="text-white" />
    46 |                 </IconButton>


ERROR in src/components/Profile/UserFullProfile.tsx:44:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    42 |             <input ref={profileUpload} type="file" name="file" accept="image/*" onChange={({ target }) => handleUploadProfilePic(target.files[0])} hidden />
    43 |             {isUser && <div className="absolute top-0 right-0 text-white transform -translate-y-16 rounded-full bg-gray-800 scale-75">
  > 44 |                 <IconButton onClick={e => profileUpload.current.click()} size="large">
       |                  ^^^^^^^^^^
    45 |                     <EditOutlined className="text-white" />
    46 |                 </IconButton>
    47 |             </div>}


ERROR in src/components/Profile/UserFullProfile.tsx:44:43

TS2532: Object is possibly 'undefined'.
    42 |             <input ref={profileUpload} type="file" name="file" accept="image/*" onChange={({ target }) => handleUploadProfilePic(target.files[0])} hidden />
    43 |             {isUser && <div className="absolute top-0 right-0 text-white transform -translate-y-16 rounded-full bg-gray-800 scale-75">
  > 44 |                 <IconButton onClick={e => profileUpload.current.click()} size="large">
       |                                           ^^^^^^^^^^^^^^^^^^^^^
    45 |                     <EditOutlined className="text-white" />
    46 |                 </IconButton>
    47 |             </div>}


ERROR in src/components/Profile/UserFullProfile.tsx:45:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    43 |             {isUser && <div className="absolute top-0 right-0 text-white transform -translate-y-16 rounded-full bg-gray-800 scale-75">
    44 |                 <IconButton onClick={e => profileUpload.current.click()} size="large">
  > 45 |                     <EditOutlined className="text-white" />
       |                      ^^^^^^^^^^^^
    46 |                 </IconButton>
    47 |             </div>}
    48 |         </div>


ERROR in src/components/Profile/UserFullProfile.tsx:79:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    77 |
    78 |     return (
  > 79 |         <div className="relative">
       |          ^^^
    80 |             <BannerPicture className="w-full h-32 rounded-xl shadow-md object-cover" uid={profileId} />
    81 |             <input ref={bannerUpload} type="file" name="file" accept="image/png" onChange={({ target }) => handleUploadBannerPic(target.files[0])} hidden />
    82 |             {isUser && <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">


ERROR in src/components/Profile/UserFullProfile.tsx:80:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    78 |     return (
    79 |         <div className="relative">
  > 80 |             <BannerPicture className="w-full h-32 rounded-xl shadow-md object-cover" uid={profileId} />
       |              ^^^^^^^^^^^^^
    81 |             <input ref={bannerUpload} type="file" name="file" accept="image/png" onChange={({ target }) => handleUploadBannerPic(target.files[0])} hidden />
    82 |             {isUser && <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
    83 |                 <IconButton onClick={e => bannerUpload.current.click()} size="large">


ERROR in src/components/Profile/UserFullProfile.tsx:80:14

TS2741: Property 'forceRefresh' is missing in type '{ className: string; uid: any; }' but required in type '{ [x: string]: any; uid: any; forceRefresh: any; }'.
    78 |     return (
    79 |         <div className="relative">
  > 80 |             <BannerPicture className="w-full h-32 rounded-xl shadow-md object-cover" uid={profileId} />
       |              ^^^^^^^^^^^^^
    81 |             <input ref={bannerUpload} type="file" name="file" accept="image/png" onChange={({ target }) => handleUploadBannerPic(target.files[0])} hidden />
    82 |             {isUser && <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
    83 |                 <IconButton onClick={e => bannerUpload.current.click()} size="large">


ERROR in src/components/Profile/UserFullProfile.tsx:81:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    79 |         <div className="relative">
    80 |             <BannerPicture className="w-full h-32 rounded-xl shadow-md object-cover" uid={profileId} />
  > 81 |             <input ref={bannerUpload} type="file" name="file" accept="image/png" onChange={({ target }) => handleUploadBannerPic(target.files[0])} hidden />
       |              ^^^^^
    82 |             {isUser && <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
    83 |                 <IconButton onClick={e => bannerUpload.current.click()} size="large">
    84 |                     <EditOutlined />


ERROR in src/components/Profile/UserFullProfile.tsx:81:20

TS2322: Type 'MutableRefObject<undefined>' is not assignable to type 'LegacyRef<HTMLInputElement> | undefined'.
    79 |         <div className="relative">
    80 |             <BannerPicture className="w-full h-32 rounded-xl shadow-md object-cover" uid={profileId} />
  > 81 |             <input ref={bannerUpload} type="file" name="file" accept="image/png" onChange={({ target }) => handleUploadBannerPic(target.files[0])} hidden />
       |                    ^^^
    82 |             {isUser && <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
    83 |                 <IconButton onClick={e => bannerUpload.current.click()} size="large">
    84 |                     <EditOutlined />


ERROR in src/components/Profile/UserFullProfile.tsx:81:130

TS2531: Object is possibly 'null'.
    79 |         <div className="relative">
    80 |             <BannerPicture className="w-full h-32 rounded-xl shadow-md object-cover" uid={profileId} />
  > 81 |             <input ref={bannerUpload} type="file" name="file" accept="image/png" onChange={({ target }) => handleUploadBannerPic(target.files[0])} hidden />
       |                                                                                                                                  ^^^^^^^^^^^^
    82 |             {isUser && <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
    83 |                 <IconButton onClick={e => bannerUpload.current.click()} size="large">
    84 |                     <EditOutlined />


ERROR in src/components/Profile/UserFullProfile.tsx:82:25

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    80 |             <BannerPicture className="w-full h-32 rounded-xl shadow-md object-cover" uid={profileId} />
    81 |             <input ref={bannerUpload} type="file" name="file" accept="image/png" onChange={({ target }) => handleUploadBannerPic(target.files[0])} hidden />
  > 82 |             {isUser && <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
       |                         ^^^
    83 |                 <IconButton onClick={e => bannerUpload.current.click()} size="large">
    84 |                     <EditOutlined />
    85 |                 </IconButton>


ERROR in src/components/Profile/UserFullProfile.tsx:83:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    81 |             <input ref={bannerUpload} type="file" name="file" accept="image/png" onChange={({ target }) => handleUploadBannerPic(target.files[0])} hidden />
    82 |             {isUser && <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
  > 83 |                 <IconButton onClick={e => bannerUpload.current.click()} size="large">
       |                  ^^^^^^^^^^
    84 |                     <EditOutlined />
    85 |                 </IconButton>
    86 |             </div>}


ERROR in src/components/Profile/UserFullProfile.tsx:83:43

TS2532: Object is possibly 'undefined'.
    81 |             <input ref={bannerUpload} type="file" name="file" accept="image/png" onChange={({ target }) => handleUploadBannerPic(target.files[0])} hidden />
    82 |             {isUser && <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
  > 83 |                 <IconButton onClick={e => bannerUpload.current.click()} size="large">
       |                                           ^^^^^^^^^^^^^^^^^^^^
    84 |                     <EditOutlined />
    85 |                 </IconButton>
    86 |             </div>}


ERROR in src/components/Profile/UserFullProfile.tsx:84:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    82 |             {isUser && <div className="absolute top-0 right-0 m-1 text-white rounded-full bg-gray-100 transform scale-75">
    83 |                 <IconButton onClick={e => bannerUpload.current.click()} size="large">
  > 84 |                     <EditOutlined />
       |                      ^^^^^^^^^^^^
    85 |                 </IconButton>
    86 |             </div>}
    87 |         </div>


ERROR in src/components/Profile/UserFullProfile.tsx:120:12

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    118 |
    119 |
  > 120 |     return <>
        |            ^^
    121 |         <div className="rounded-xl shadow-lg w-full overflow-hidden bg-white">
    122 |             <UserBannerPicture profileId={profileId} isUser={isUser} />
    123 |             <div className="flex flex-col md:flex-row p-3 w-full items-start">


ERROR in src/components/Profile/UserFullProfile.tsx:121:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    119 |
    120 |     return <>
  > 121 |         <div className="rounded-xl shadow-lg w-full overflow-hidden bg-white">
        |          ^^^
    122 |             <UserBannerPicture profileId={profileId} isUser={isUser} />
    123 |             <div className="flex flex-col md:flex-row p-3 w-full items-start">
    124 |                 <UserProfilePicture profileId={profileId} isUser={isUser}/>


ERROR in src/components/Profile/UserFullProfile.tsx:122:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    120 |     return <>
    121 |         <div className="rounded-xl shadow-lg w-full overflow-hidden bg-white">
  > 122 |             <UserBannerPicture profileId={profileId} isUser={isUser} />
        |              ^^^^^^^^^^^^^^^^^
    123 |             <div className="flex flex-col md:flex-row p-3 w-full items-start">
    124 |                 <UserProfilePicture profileId={profileId} isUser={isUser}/>
    125 |                 <div className="flex flex-col space-y-1 w-full relative transform -mb-16 md:mb-0 -translate-y-16 md:translate-y-0">


ERROR in src/components/Profile/UserFullProfile.tsx:123:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    121 |         <div className="rounded-xl shadow-lg w-full overflow-hidden bg-white">
    122 |             <UserBannerPicture profileId={profileId} isUser={isUser} />
  > 123 |             <div className="flex flex-col md:flex-row p-3 w-full items-start">
        |              ^^^
    124 |                 <UserProfilePicture profileId={profileId} isUser={isUser}/>
    125 |                 <div className="flex flex-col space-y-1 w-full relative transform -mb-16 md:mb-0 -translate-y-16 md:translate-y-0">
    126 |                     <div className="flex flex-row justify-between items-center">


ERROR in src/components/Profile/UserFullProfile.tsx:124:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    122 |             <UserBannerPicture profileId={profileId} isUser={isUser} />
    123 |             <div className="flex flex-col md:flex-row p-3 w-full items-start">
  > 124 |                 <UserProfilePicture profileId={profileId} isUser={isUser}/>
        |                  ^^^^^^^^^^^^^^^^^^
    125 |                 <div className="flex flex-col space-y-1 w-full relative transform -mb-16 md:mb-0 -translate-y-16 md:translate-y-0">
    126 |                     <div className="flex flex-row justify-between items-center">
    127 |                         <h1 className="text-2xl text-gray-800">{name}</h1>


ERROR in src/components/Profile/UserFullProfile.tsx:125:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    123 |             <div className="flex flex-col md:flex-row p-3 w-full items-start">
    124 |                 <UserProfilePicture profileId={profileId} isUser={isUser}/>
  > 125 |                 <div className="flex flex-col space-y-1 w-full relative transform -mb-16 md:mb-0 -translate-y-16 md:translate-y-0">
        |                  ^^^
    126 |                     <div className="flex flex-row justify-between items-center">
    127 |                         <h1 className="text-2xl text-gray-800">{name}</h1>
    128 |                         {/* Show Edit Profile if is User, else show Message User */}


ERROR in src/components/Profile/UserFullProfile.tsx:126:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    124 |                 <UserProfilePicture profileId={profileId} isUser={isUser}/>
    125 |                 <div className="flex flex-col space-y-1 w-full relative transform -mb-16 md:mb-0 -translate-y-16 md:translate-y-0">
  > 126 |                     <div className="flex flex-row justify-between items-center">
        |                      ^^^
    127 |                         <h1 className="text-2xl text-gray-800">{name}</h1>
    128 |                         {/* Show Edit Profile if is User, else show Message User */}
    129 |                         {isUser ? <div className="flex flex-row space-y-1">


ERROR in src/components/Profile/UserFullProfile.tsx:127:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    125 |                 <div className="flex flex-col space-y-1 w-full relative transform -mb-16 md:mb-0 -translate-y-16 md:translate-y-0">
    126 |                     <div className="flex flex-row justify-between items-center">
  > 127 |                         <h1 className="text-2xl text-gray-800">{name}</h1>
        |                          ^^
    128 |                         {/* Show Edit Profile if is User, else show Message User */}
    129 |                         {isUser ? <div className="flex flex-row space-y-1">
    130 |                             <IconButton onClick={() => signOut()} size="large">


ERROR in src/components/Profile/UserFullProfile.tsx:129:36

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    127 |                         <h1 className="text-2xl text-gray-800">{name}</h1>
    128 |                         {/* Show Edit Profile if is User, else show Message User */}
  > 129 |                         {isUser ? <div className="flex flex-row space-y-1">
        |                                    ^^^
    130 |                             <IconButton onClick={() => signOut()} size="large">
    131 |                                 <ExitToAppOutlined className="text-red-600" />
    132 |                             </IconButton>


ERROR in src/components/Profile/UserFullProfile.tsx:130:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    128 |                         {/* Show Edit Profile if is User, else show Message User */}
    129 |                         {isUser ? <div className="flex flex-row space-y-1">
  > 130 |                             <IconButton onClick={() => signOut()} size="large">
        |                              ^^^^^^^^^^
    131 |                                 <ExitToAppOutlined className="text-red-600" />
    132 |                             </IconButton>
    133 |                             <div className="hidden md:inline">


ERROR in src/components/Profile/UserFullProfile.tsx:131:34

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    129 |                         {isUser ? <div className="flex flex-row space-y-1">
    130 |                             <IconButton onClick={() => signOut()} size="large">
  > 131 |                                 <ExitToAppOutlined className="text-red-600" />
        |                                  ^^^^^^^^^^^^^^^^^
    132 |                             </IconButton>
    133 |                             <div className="hidden md:inline">
    134 |                                 <Button variant="contained" color="primary" onClick={e => setOpenEditDetails(true)}>Edit Your Profile</Button>


ERROR in src/components/Profile/UserFullProfile.tsx:133:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    131 |                                 <ExitToAppOutlined className="text-red-600" />
    132 |                             </IconButton>
  > 133 |                             <div className="hidden md:inline">
        |                              ^^^
    134 |                                 <Button variant="contained" color="primary" onClick={e => setOpenEditDetails(true)}>Edit Your Profile</Button>
    135 |                             </div>
    136 |                             <div className="md:hidden">


ERROR in src/components/Profile/UserFullProfile.tsx:134:34

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    132 |                             </IconButton>
    133 |                             <div className="hidden md:inline">
  > 134 |                                 <Button variant="contained" color="primary" onClick={e => setOpenEditDetails(true)}>Edit Your Profile</Button>
        |                                  ^^^^^^
    135 |                             </div>
    136 |                             <div className="md:hidden">
    137 |                                 <IconButton onClick={e => setOpenEditDetails(true)} size="large"><EditOutlined /></IconButton>


ERROR in src/components/Profile/UserFullProfile.tsx:136:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    134 |                                 <Button variant="contained" color="primary" onClick={e => setOpenEditDetails(true)}>Edit Your Profile</Button>
    135 |                             </div>
  > 136 |                             <div className="md:hidden">
        |                              ^^^
    137 |                                 <IconButton onClick={e => setOpenEditDetails(true)} size="large"><EditOutlined /></IconButton>
    138 |                             </div>
    139 |                         </div> : <>


ERROR in src/components/Profile/UserFullProfile.tsx:137:34

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    135 |                             </div>
    136 |                             <div className="md:hidden">
  > 137 |                                 <IconButton onClick={e => setOpenEditDetails(true)} size="large"><EditOutlined /></IconButton>
        |                                  ^^^^^^^^^^
    138 |                             </div>
    139 |                         </div> : <>
    140 |                             <div className="hidden md:inline">


ERROR in src/components/Profile/UserFullProfile.tsx:137:99

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    135 |                             </div>
    136 |                             <div className="md:hidden">
  > 137 |                                 <IconButton onClick={e => setOpenEditDetails(true)} size="large"><EditOutlined /></IconButton>
        |                                                                                                   ^^^^^^^^^^^^
    138 |                             </div>
    139 |                         </div> : <>
    140 |                             <div className="hidden md:inline">


ERROR in src/components/Profile/UserFullProfile.tsx:139:34

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    137 |                                 <IconButton onClick={e => setOpenEditDetails(true)} size="large"><EditOutlined /></IconButton>
    138 |                             </div>
  > 139 |                         </div> : <>
        |                                  ^^
    140 |                             <div className="hidden md:inline">
    141 |                                 <Button variant="contained" color="primary" startIcon={<MessageOutlined />} onClick={() => connectWithPerson()}>Message</Button>
    142 |                             </div>


ERROR in src/components/Profile/UserFullProfile.tsx:140:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    138 |                             </div>
    139 |                         </div> : <>
  > 140 |                             <div className="hidden md:inline">
        |                              ^^^
    141 |                                 <Button variant="contained" color="primary" startIcon={<MessageOutlined />} onClick={() => connectWithPerson()}>Message</Button>
    142 |                             </div>
    143 |                             <div className="md:hidden">


ERROR in src/components/Profile/UserFullProfile.tsx:141:34

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    139 |                         </div> : <>
    140 |                             <div className="hidden md:inline">
  > 141 |                                 <Button variant="contained" color="primary" startIcon={<MessageOutlined />} onClick={() => connectWithPerson()}>Message</Button>
        |                                  ^^^^^^
    142 |                             </div>
    143 |                             <div className="md:hidden">
    144 |                                 <IconButton onClick={() => connectWithPerson()} size="large"><MessageOutlined /></IconButton>


ERROR in src/components/Profile/UserFullProfile.tsx:141:89

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    139 |                         </div> : <>
    140 |                             <div className="hidden md:inline">
  > 141 |                                 <Button variant="contained" color="primary" startIcon={<MessageOutlined />} onClick={() => connectWithPerson()}>Message</Button>
        |                                                                                         ^^^^^^^^^^^^^^^
    142 |                             </div>
    143 |                             <div className="md:hidden">
    144 |                                 <IconButton onClick={() => connectWithPerson()} size="large"><MessageOutlined /></IconButton>


ERROR in src/components/Profile/UserFullProfile.tsx:143:30

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    141 |                                 <Button variant="contained" color="primary" startIcon={<MessageOutlined />} onClick={() => connectWithPerson()}>Message</Button>
    142 |                             </div>
  > 143 |                             <div className="md:hidden">
        |                              ^^^
    144 |                                 <IconButton onClick={() => connectWithPerson()} size="large"><MessageOutlined /></IconButton>
    145 |                             </div>
    146 |                         </>}


ERROR in src/components/Profile/UserFullProfile.tsx:144:34

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    142 |                             </div>
    143 |                             <div className="md:hidden">
  > 144 |                                 <IconButton onClick={() => connectWithPerson()} size="large"><MessageOutlined /></IconButton>
        |                                  ^^^^^^^^^^
    145 |                             </div>
    146 |                         </>}
    147 |                     </div>


ERROR in src/components/Profile/UserFullProfile.tsx:144:95

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    142 |                             </div>
    143 |                             <div className="md:hidden">
  > 144 |                                 <IconButton onClick={() => connectWithPerson()} size="large"><MessageOutlined /></IconButton>
        |                                                                                               ^^^^^^^^^^^^^^^
    145 |                             </div>
    146 |                         </>}
    147 |                     </div>


ERROR in src/components/Profile/UserFullProfile.tsx:148:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    146 |                         </>}
    147 |                     </div>
  > 148 |                     <p className="text-gray-600 text-sm">{isMentor ? "Mentor" : major} at {school}</p>
        |                      ^
    149 |                     <p className="text-gray-600 text-sm ">{country}</p>
    150 |                     <div className="flex flex-row items-center my-5 space-x-3">
    151 |                         <UserHighlight highlight={highlight1} />


ERROR in src/components/Profile/UserFullProfile.tsx:149:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    147 |                     </div>
    148 |                     <p className="text-gray-600 text-sm">{isMentor ? "Mentor" : major} at {school}</p>
  > 149 |                     <p className="text-gray-600 text-sm ">{country}</p>
        |                      ^
    150 |                     <div className="flex flex-row items-center my-5 space-x-3">
    151 |                         <UserHighlight highlight={highlight1} />
    152 |                         <UserHighlight highlight={highlight2} />


ERROR in src/components/Profile/UserFullProfile.tsx:150:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    148 |                     <p className="text-gray-600 text-sm">{isMentor ? "Mentor" : major} at {school}</p>
    149 |                     <p className="text-gray-600 text-sm ">{country}</p>
  > 150 |                     <div className="flex flex-row items-center my-5 space-x-3">
        |                      ^^^
    151 |                         <UserHighlight highlight={highlight1} />
    152 |                         <UserHighlight highlight={highlight2} />
    153 |                     </div>


ERROR in src/components/Profile/UserFullProfile.tsx:151:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    149 |                     <p className="text-gray-600 text-sm ">{country}</p>
    150 |                     <div className="flex flex-row items-center my-5 space-x-3">
  > 151 |                         <UserHighlight highlight={highlight1} />
        |                          ^^^^^^^^^^^^^
    152 |                         <UserHighlight highlight={highlight2} />
    153 |                     </div>
    154 |                 </div>


ERROR in src/components/Profile/UserFullProfile.tsx:152:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    150 |                     <div className="flex flex-row items-center my-5 space-x-3">
    151 |                         <UserHighlight highlight={highlight1} />
  > 152 |                         <UserHighlight highlight={highlight2} />
        |                          ^^^^^^^^^^^^^
    153 |                     </div>
    154 |                 </div>
    155 |             </div>


ERROR in src/components/Profile/UserFullProfile.tsx:157:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    155 |             </div>
    156 |         </div>
  > 157 |         <LazyEditDetailsDialog open={openEditDetails} onClose={() => setOpenEditDetails(false)} />
        |          ^^^^^^^^^^^^^^^^^^^^^
    158 |         <MentorCardModal open={mentorModalOpen} setOpen={setMentorModalOpen} mentorSelected={{id: profileId, ...userDetails}}/>
    159 |     </>;
    160 | }


ERROR in src/components/Profile/UserFullProfile.tsx:158:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    156 |         </div>
    157 |         <LazyEditDetailsDialog open={openEditDetails} onClose={() => setOpenEditDetails(false)} />
  > 158 |         <MentorCardModal open={mentorModalOpen} setOpen={setMentorModalOpen} mentorSelected={{id: profileId, ...userDetails}}/>
        |          ^^^^^^^^^^^^^^^
    159 |     </>;
    160 | }


ERROR in src/components/ServiceWorker/ServiceWorkerWrapper.tsx:19:20

TS2339: Property 'postMessage' does not exist on type 'never'.
    17 |
    18 |   const reloadPage = () => {
  > 19 |     waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
       |                    ^^^^^^^^^^^
    20 |     setShowReload(false);
    21 |     window.location.reload();
    22 |   };


ERROR in src/components/Team/TeamCard.tsx:3:6

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    1 | export const TeamCard = ({ fullname, title, linkedinUrl, imageUrl }) => {
    2 |   return (
  > 3 |     <div className="home-team__card">
      |      ^^^
    4 |       <img className="home-team__card-pic" src={imageUrl} alt="Speer Team Member"/>
    5 |       <div className="home-team__card-bio">
    6 |         <h2>{fullname}</h2>


ERROR in src/components/Team/TeamCard.tsx:4:8

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    2 |   return (
    3 |     <div className="home-team__card">
  > 4 |       <img className="home-team__card-pic" src={imageUrl} alt="Speer Team Member"/>
      |        ^^^
    5 |       <div className="home-team__card-bio">
    6 |         <h2>{fullname}</h2>
    7 |         <p>{title}</p>


ERROR in src/components/Team/TeamCard.tsx:5:8

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    3 |     <div className="home-team__card">
    4 |       <img className="home-team__card-pic" src={imageUrl} alt="Speer Team Member"/>
  > 5 |       <div className="home-team__card-bio">
      |        ^^^
    6 |         <h2>{fullname}</h2>
    7 |         <p>{title}</p>
    8 |         <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">


ERROR in src/components/Team/TeamCard.tsx:6:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    4 |       <img className="home-team__card-pic" src={imageUrl} alt="Speer Team Member"/>
    5 |       <div className="home-team__card-bio">
  > 6 |         <h2>{fullname}</h2>
      |          ^^
    7 |         <p>{title}</p>
    8 |         <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
    9 |           <span>Linkedin</span>


ERROR in src/components/Team/TeamCard.tsx:7:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     5 |       <div className="home-team__card-bio">
     6 |         <h2>{fullname}</h2>
  >  7 |         <p>{title}</p>
       |          ^
     8 |         <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
     9 |           <span>Linkedin</span>
    10 |           <i className="fab fa-2x fa-linkedin-in"></i>


ERROR in src/components/Team/TeamCard.tsx:8:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     6 |         <h2>{fullname}</h2>
     7 |         <p>{title}</p>
  >  8 |         <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
       |          ^
     9 |           <span>Linkedin</span>
    10 |           <i className="fab fa-2x fa-linkedin-in"></i>
    11 |         </a>


ERROR in src/components/Team/TeamCard.tsx:9:12

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     7 |         <p>{title}</p>
     8 |         <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
  >  9 |           <span>Linkedin</span>
       |            ^^^^
    10 |           <i className="fab fa-2x fa-linkedin-in"></i>
    11 |         </a>
    12 |       </div>


ERROR in src/components/Team/TeamCard.tsx:10:12

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     8 |         <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
     9 |           <span>Linkedin</span>
  > 10 |           <i className="fab fa-2x fa-linkedin-in"></i>
       |            ^
    11 |         </a>
    12 |       </div>
    13 |     </div>


ERROR in src/components/User/BannerPicture.tsx:18:16

TS2345: Argument of type 'string' is not assignable to parameter of type 'SetStateAction<boolean>'.
    16 |     useEffect(() => {
    17 |         if(!user || !uid) return;
  > 18 |         setUrl(`https://storage.googleapis.com/speer-education-dev.appspot.com/users/${uid}/bannerPicture.png?${(forceRefresh || uid == user?.uid)?appInstance:''}`);
       |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    19 |     }, [uid, user]);
    20 |
    21 |     return <>


ERROR in src/components/User/BannerPicture.tsx:21:12

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    19 |     }, [uid, user]);
    20 |
  > 21 |     return <>
       |            ^^
    22 |         <img
    23 |             ref={imageRef}
    24 |             src={url}


ERROR in src/components/User/BannerPicture.tsx:22:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    20 |
    21 |     return <>
  > 22 |         <img
       |          ^^^
    23 |             ref={imageRef}
    24 |             src={url}
    25 |             alt="banner"


ERROR in src/components/User/BannerPicture.tsx:23:13

TS2322: Type 'MutableRefObject<undefined>' is not assignable to type 'LegacyRef<HTMLImageElement> | undefined'.
  Type 'MutableRefObject<undefined>' is not assignable to type 'RefObject<HTMLImageElement>'.
    Types of property 'current' are incompatible.
      Type 'undefined' is not assignable to type 'HTMLImageElement | null'.
    21 |     return <>
    22 |         <img
  > 23 |             ref={imageRef}
       |             ^^^
    24 |             src={url}
    25 |             alt="banner"
    26 |             onError={(e) => { 


ERROR in src/components/User/BannerPicture.tsx:24:13

TS2322: Type 'boolean' is not assignable to type 'string'.
    22 |         <img
    23 |             ref={imageRef}
  > 24 |             src={url}
       |             ^^^
    25 |             alt="banner"
    26 |             onError={(e) => { 
    27 |                 if (imageRef.current.src != '/banner_placeholder.png') imageRef.current.src = '/banner_placeholder.png';


ERROR in src/components/User/BannerPicture.tsx:27:21

TS2532: Object is possibly 'undefined'.
    25 |             alt="banner"
    26 |             onError={(e) => { 
  > 27 |                 if (imageRef.current.src != '/banner_placeholder.png') imageRef.current.src = '/banner_placeholder.png';
       |                     ^^^^^^^^^^^^^^^^
    28 |             }}
    29 |             {...params}
    30 |         />


ERROR in src/components/User/BannerPicture.tsx:27:72

TS2532: Object is possibly 'undefined'.
    25 |             alt="banner"
    26 |             onError={(e) => { 
  > 27 |                 if (imageRef.current.src != '/banner_placeholder.png') imageRef.current.src = '/banner_placeholder.png';
       |                                                                        ^^^^^^^^^^^^^^^^
    28 |             }}
    29 |             {...params}
    30 |         />


ERROR in src/components/User/ProfilePicture.tsx:40:13

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    38 |     }, [uid, user]);
    39 |
  > 40 |     return <img
       |             ^^^
    41 |         src={url}
    42 |         className={`${className} bg-white object-cover`}
    43 |         alt="User"


ERROR in src/components/User/ProfilePicture.tsx:44:9

TS2322: Type 'MutableRefObject<HTMLImageElement | undefined>' is not assignable to type 'LegacyRef<HTMLImageElement> | undefined'.
  Type 'MutableRefObject<HTMLImageElement | undefined>' is not assignable to type 'RefObject<HTMLImageElement>'.
    Types of property 'current' are incompatible.
      Type 'HTMLImageElement | undefined' is not assignable to type 'HTMLImageElement | null'.
        Type 'undefined' is not assignable to type 'HTMLImageElement | null'.
    42 |         className={`${className} bg-white object-cover`}
    43 |         alt="User"
  > 44 |         ref={imageRef}
       |         ^^^
    45 |         onError={(e) => { 
    46 |             if (imageRef.current && imageRef.current.src != '/user_placeholder.png') imageRef.current.src = '/user_placeholder.png';
    47 |         }}


ERROR in src/components/User/UserHighlight.tsx:2:26

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    1 | export default function UserHighlight({highlight}){
  > 2 |     if(!highlight)return <></>;
      |                          ^^
    3 |
    4 |     return (
    5 |         <div className="flex flex-row space-x-2 items-center">


ERROR in src/components/User/UserHighlight.tsx:5:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    3 |
    4 |     return (
  > 5 |         <div className="flex flex-row space-x-2 items-center">
      |          ^^^
    6 |             <div className="w-12 h-12 p-3 text-center text-2xl bg-white rounded-xl flex justify-center items-center shadow-md">{highlight?.emoji}</div>
    7 |             <span className="text-sm text-gray-500">{highlight?.description}</span>
    8 |         </div>


ERROR in src/components/User/UserHighlight.tsx:6:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    4 |     return (
    5 |         <div className="flex flex-row space-x-2 items-center">
  > 6 |             <div className="w-12 h-12 p-3 text-center text-2xl bg-white rounded-xl flex justify-center items-center shadow-md">{highlight?.emoji}</div>
      |              ^^^
    7 |             <span className="text-sm text-gray-500">{highlight?.description}</span>
    8 |         </div>
    9 |     )


ERROR in src/components/User/UserHighlight.tsx:7:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     5 |         <div className="flex flex-row space-x-2 items-center">
     6 |             <div className="w-12 h-12 p-3 text-center text-2xl bg-white rounded-xl flex justify-center items-center shadow-md">{highlight?.emoji}</div>
  >  7 |             <span className="text-sm text-gray-500">{highlight?.description}</span>
       |              ^^^^
     8 |         </div>
     9 |     )
    10 | }


ERROR in src/components/User/UserSmallProfileCard.tsx:8:13

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     6 |     const { user } = useAuth();
     7 |     const { name , major, school, highlight1, highlight2 } = userDetails || {};
  >  8 |     return <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
       |             ^^^
     9 |         {!userDetails?.name ? <p>Loading...</p>:
    10 |         <><div className="flex flex-row space-x-2 items-center">
    11 |             <ProfilePicture uid={uid} alt="user" className="w-28 h-28 rounded-full border-white border-8 border-solid shadow-lg"/>


ERROR in src/components/User/UserSmallProfileCard.tsx:9:32

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     7 |     const { name , major, school, highlight1, highlight2 } = userDetails || {};
     8 |     return <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
  >  9 |         {!userDetails?.name ? <p>Loading...</p>:
       |                                ^
    10 |         <><div className="flex flex-row space-x-2 items-center">
    11 |             <ProfilePicture uid={uid} alt="user" className="w-28 h-28 rounded-full border-white border-8 border-solid shadow-lg"/>
    12 |             <div className="space-y-1 ">


ERROR in src/components/User/UserSmallProfileCard.tsx:10:9

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     8 |     return <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
     9 |         {!userDetails?.name ? <p>Loading...</p>:
  > 10 |         <><div className="flex flex-row space-x-2 items-center">
       |         ^^
    11 |             <ProfilePicture uid={uid} alt="user" className="w-28 h-28 rounded-full border-white border-8 border-solid shadow-lg"/>
    12 |             <div className="space-y-1 ">
    13 |                 <h3 className="font-semibold text-xl">{name}</h3>


ERROR in src/components/User/UserSmallProfileCard.tsx:10:12

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     8 |     return <div className="p-3 m-2 shadow-lg rounded-md bg-white bg-opacity-90 space-y-6">
     9 |         {!userDetails?.name ? <p>Loading...</p>:
  > 10 |         <><div className="flex flex-row space-x-2 items-center">
       |            ^^^
    11 |             <ProfilePicture uid={uid} alt="user" className="w-28 h-28 rounded-full border-white border-8 border-solid shadow-lg"/>
    12 |             <div className="space-y-1 ">
    13 |                 <h3 className="font-semibold text-xl">{name}</h3>


ERROR in src/components/User/UserSmallProfileCard.tsx:11:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
     9 |         {!userDetails?.name ? <p>Loading...</p>:
    10 |         <><div className="flex flex-row space-x-2 items-center">
  > 11 |             <ProfilePicture uid={uid} alt="user" className="w-28 h-28 rounded-full border-white border-8 border-solid shadow-lg"/>
       |              ^^^^^^^^^^^^^^
    12 |             <div className="space-y-1 ">
    13 |                 <h3 className="font-semibold text-xl">{name}</h3>
    14 |                 <p className="text-md text-gray-600">{major} @ {school}</p>


ERROR in src/components/User/UserSmallProfileCard.tsx:11:39

TS2322: Type '{ uid: any; alt: string; className: string; }' is not assignable to type 'IntrinsicAttributes & { uid: string; thumb?: boolean | undefined; className?: string | undefined; isRoom?: string | undefined; forceRefresh?: boolean | undefined; } & HTMLAttributes<...>'.
  Property 'alt' does not exist on type 'IntrinsicAttributes & { uid: string; thumb?: boolean | undefined; className?: string | undefined; isRoom?: string | undefined; forceRefresh?: boolean | undefined; } & HTMLAttributes<...>'.
     9 |         {!userDetails?.name ? <p>Loading...</p>:
    10 |         <><div className="flex flex-row space-x-2 items-center">
  > 11 |             <ProfilePicture uid={uid} alt="user" className="w-28 h-28 rounded-full border-white border-8 border-solid shadow-lg"/>
       |                                       ^^^
    12 |             <div className="space-y-1 ">
    13 |                 <h3 className="font-semibold text-xl">{name}</h3>
    14 |                 <p className="text-md text-gray-600">{major} @ {school}</p>


ERROR in src/components/User/UserSmallProfileCard.tsx:12:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    10 |         <><div className="flex flex-row space-x-2 items-center">
    11 |             <ProfilePicture uid={uid} alt="user" className="w-28 h-28 rounded-full border-white border-8 border-solid shadow-lg"/>
  > 12 |             <div className="space-y-1 ">
       |              ^^^
    13 |                 <h3 className="font-semibold text-xl">{name}</h3>
    14 |                 <p className="text-md text-gray-600">{major} @ {school}</p>
    15 |             </div>


ERROR in src/components/User/UserSmallProfileCard.tsx:13:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    11 |             <ProfilePicture uid={uid} alt="user" className="w-28 h-28 rounded-full border-white border-8 border-solid shadow-lg"/>
    12 |             <div className="space-y-1 ">
  > 13 |                 <h3 className="font-semibold text-xl">{name}</h3>
       |                  ^^
    14 |                 <p className="text-md text-gray-600">{major} @ {school}</p>
    15 |             </div>
    16 |         </div>


ERROR in src/components/User/UserSmallProfileCard.tsx:14:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    12 |             <div className="space-y-1 ">
    13 |                 <h3 className="font-semibold text-xl">{name}</h3>
  > 14 |                 <p className="text-md text-gray-600">{major} @ {school}</p>
       |                  ^
    15 |             </div>
    16 |         </div>
    17 |         <div>


ERROR in src/components/User/UserSmallProfileCard.tsx:17:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    15 |             </div>
    16 |         </div>
  > 17 |         <div>
       |          ^^^
    18 |             <h3 className="text-gray-500 mb-2 font-semibold text-xl">{(user?.uid === uid)?"Your":`${name}'s`} Education</h3>
    19 |             <div className="flex flex-row items-center rounded-xl shadow-lg px-3 py-5 space-x-2">
    20 |                 <p className="text-4xl w-16 text-center">🏫</p>


ERROR in src/components/User/UserSmallProfileCard.tsx:18:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    16 |         </div>
    17 |         <div>
  > 18 |             <h3 className="text-gray-500 mb-2 font-semibold text-xl">{(user?.uid === uid)?"Your":`${name}'s`} Education</h3>
       |              ^^
    19 |             <div className="flex flex-row items-center rounded-xl shadow-lg px-3 py-5 space-x-2">
    20 |                 <p className="text-4xl w-16 text-center">🏫</p>
    21 |                 <div className="space-y-2">


ERROR in src/components/User/UserSmallProfileCard.tsx:19:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    17 |         <div>
    18 |             <h3 className="text-gray-500 mb-2 font-semibold text-xl">{(user?.uid === uid)?"Your":`${name}'s`} Education</h3>
  > 19 |             <div className="flex flex-row items-center rounded-xl shadow-lg px-3 py-5 space-x-2">
       |              ^^^
    20 |                 <p className="text-4xl w-16 text-center">🏫</p>
    21 |                 <div className="space-y-2">
    22 |                     <h3 className="font-semibold text-xl">{major}</h3>


ERROR in src/components/User/UserSmallProfileCard.tsx:20:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    18 |             <h3 className="text-gray-500 mb-2 font-semibold text-xl">{(user?.uid === uid)?"Your":`${name}'s`} Education</h3>
    19 |             <div className="flex flex-row items-center rounded-xl shadow-lg px-3 py-5 space-x-2">
  > 20 |                 <p className="text-4xl w-16 text-center">🏫</p>
       |                  ^
    21 |                 <div className="space-y-2">
    22 |                     <h3 className="font-semibold text-xl">{major}</h3>
    23 |                     <p>{school}</p>


ERROR in src/components/User/UserSmallProfileCard.tsx:21:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    19 |             <div className="flex flex-row items-center rounded-xl shadow-lg px-3 py-5 space-x-2">
    20 |                 <p className="text-4xl w-16 text-center">🏫</p>
  > 21 |                 <div className="space-y-2">
       |                  ^^^
    22 |                     <h3 className="font-semibold text-xl">{major}</h3>
    23 |                     <p>{school}</p>
    24 |                 </div>


ERROR in src/components/User/UserSmallProfileCard.tsx:22:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    20 |                 <p className="text-4xl w-16 text-center">🏫</p>
    21 |                 <div className="space-y-2">
  > 22 |                     <h3 className="font-semibold text-xl">{major}</h3>
       |                      ^^
    23 |                     <p>{school}</p>
    24 |                 </div>
    25 |             </div>


ERROR in src/components/User/UserSmallProfileCard.tsx:23:22

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    21 |                 <div className="space-y-2">
    22 |                     <h3 className="font-semibold text-xl">{major}</h3>
  > 23 |                     <p>{school}</p>
       |                      ^
    24 |                 </div>
    25 |             </div>
    26 |         </div>


ERROR in src/components/User/UserSmallProfileCard.tsx:27:10

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    25 |             </div>
    26 |         </div>
  > 27 |         <div className="mt-5 mb-6">
       |          ^^^
    28 |             <h3 className="text-gray-600 font-semibold text-xl">{(user?.uid === uid)?"Your":`${name}'s`}  Highlights</h3>
    29 |             <div className="flex flex-row items-center my-5 space-x-3">
    30 |                 <UserHighlight highlight={highlight1}/>


ERROR in src/components/User/UserSmallProfileCard.tsx:28:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    26 |         </div>
    27 |         <div className="mt-5 mb-6">
  > 28 |             <h3 className="text-gray-600 font-semibold text-xl">{(user?.uid === uid)?"Your":`${name}'s`}  Highlights</h3>
       |              ^^
    29 |             <div className="flex flex-row items-center my-5 space-x-3">
    30 |                 <UserHighlight highlight={highlight1}/>
    31 |                 <UserHighlight highlight={highlight2}/>


ERROR in src/components/User/UserSmallProfileCard.tsx:29:14

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    27 |         <div className="mt-5 mb-6">
    28 |             <h3 className="text-gray-600 font-semibold text-xl">{(user?.uid === uid)?"Your":`${name}'s`}  Highlights</h3>
  > 29 |             <div className="flex flex-row items-center my-5 space-x-3">
       |              ^^^
    30 |                 <UserHighlight highlight={highlight1}/>
    31 |                 <UserHighlight highlight={highlight2}/>
    32 |             </div>


ERROR in src/components/User/UserSmallProfileCard.tsx:30:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    28 |             <h3 className="text-gray-600 font-semibold text-xl">{(user?.uid === uid)?"Your":`${name}'s`}  Highlights</h3>
    29 |             <div className="flex flex-row items-center my-5 space-x-3">
  > 30 |                 <UserHighlight highlight={highlight1}/>
       |                  ^^^^^^^^^^^^^
    31 |                 <UserHighlight highlight={highlight2}/>
    32 |             </div>
    33 |         </div></>


ERROR in src/components/User/UserSmallProfileCard.tsx:31:18

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    29 |             <div className="flex flex-row items-center my-5 space-x-3">
    30 |                 <UserHighlight highlight={highlight1}/>
  > 31 |                 <UserHighlight highlight={highlight2}/>
       |                  ^^^^^^^^^^^^^
    32 |             </div>
    33 |         </div></>
    34 |         }


ERROR in src/hooks/useAuth.tsx:8:71

TS2345: Argument of type 'null' is not assignable to parameter of type '{ user: firebase.User | null; userDetails: UserDetailsToken; getUserTokenResult: (refresh?: boolean) => Promise<{ [key: string]: any; } | undefined>; appInstance: number; signInWithEmailAndPassword: ({ email, password }: { ...; }) => Promise<...>; signOut: () => Promise<...>; initGoogleSignIn: () => Promise<...>; }'.
     6 | import { useLocalStorage } from "./useHooks";
     7 |
  >  8 | const authContext = createContext<ReturnType<typeof useAuthProvider>>(null);
       |                                                                       ^^^^
     9 | const { Provider } = authContext;
    10 |
    11 | /**


ERROR in src/hooks/useAuth.tsx:18:13

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    16 | export function AuthProvider({ children }) {
    17 |     const auth = useAuthProvider();
  > 18 |     return <Provider value={auth}>{children}</Provider>;
       |             ^^^^^^^^
    19 | }
    20 |
    21 | /**


ERROR in src/hooks/useAuth.tsx:42:70

TS2345: Argument of type 'null' is not assignable to parameter of type 'UserDetailsToken | (() => UserDetailsToken)'.
    40 | const useAuthProvider = () => {
    41 |     const [user, setUser] = useState<firebase.User | null>(null); 
  > 42 |     const [userDetails, setUserDetails] = useState<UserDetailsToken>(null);
       |                                                                      ^^^^
    43 |     const [lastCommitted, setLastCommitted] = useLocalStorage("lastCommited", 0);  //The last committed state of our user claims document, decides if token needs to update if outdated
    44 |     const navigate = useNavigate();
    45 |     const location = useLocation();


ERROR in src/hooks/useAuth.tsx:112:21

TS2345: Argument of type 'false' is not assignable to parameter of type 'SetStateAction<User | null>'.
    110 |             setUser(user);
    111 |         } else {
  > 112 |             setUser(false);
        |                     ^^^^^
    113 |         }
    114 |     };
    115 |


ERROR in src/hooks/useAuth.tsx:131:32

TS2345: Argument of type '{ bio?: string | undefined; country?: string | undefined; dateOfBirth?: string | undefined; email?: string | undefined; finishSetup?: boolean | undefined; highlight1?: UserHighlight | undefined; ... 16 more ...; _lastCommitted?: firebase.firestore.Timestamp | undefined; }' is not assignable to parameter of type 'SetStateAction<UserDetailsToken>'.
  Type '{ bio?: string | undefined; country?: string | undefined; dateOfBirth?: string | undefined; email?: string | undefined; finishSetup?: boolean | undefined; highlight1?: UserHighlight | undefined; ... 16 more ...; _lastCommitted?: firebase.firestore.Timestamp | undefined; }' is not assignable to type 'UserDetailsToken'.
    Type '{ bio?: string | undefined; country?: string | undefined; dateOfBirth?: string | undefined; email?: string | undefined; finishSetup?: boolean | undefined; highlight1?: UserHighlight | undefined; ... 16 more ...; _lastCommitted?: firebase.firestore.Timestamp | undefined; }' is not assignable to type 'UserDetails'.
      Types of property 'bio' are incompatible.
        Type 'string | undefined' is not assignable to type 'string'.
          Type 'undefined' is not assignable to type 'string'.
    129 |
    130 |             if (lastCommitted && !(data?._lastCommitted || {}).isEqual(lastCommitted)) {
  > 131 |                 setUserDetails({ ...(await getUserTokenResult(true)), ...latestUserDetails })
        |                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    132 |             }
    133 |             setLastCommitted(data?._lastCommitted);
    134 |         },


ERROR in src/hooks/useAuth.tsx:192:21

TS2345: Argument of type 'false' is not assignable to parameter of type 'SetStateAction<User | null>'.
    190 |     const signOut = () => {
    191 |         return auth.signOut().then(() => {
  > 192 |             setUser(false);
        |                     ^^^^^
    193 |             logEvent('logout');
    194 |             window.location.replace('https://speeredu.com')
    195 |         });


ERROR in src/hooks/useRequireAuth.tsx:7:13

TS2367: This condition will always return 'false' since the types 'User | null' and 'boolean' have no overlap.
     5 |     const auth = useAuth();
     6 |     useEffect(() => {
  >  7 |         if (auth.user === false) {
       |             ^^^^^^^^^^^^^^^^^^^
     8 |             //Do something if user is not signed in like route to login page?
     9 |         }
    10 |     }, [auth]);


ERROR in src/index.tsx:24:3

TS2345: Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Element | DocumentFragment'.
  Type 'null' is not assignable to type 'Element | DocumentFragment'.
    22 |
    23 | ReactDOM.createRoot(
  > 24 |   document.getElementById('root')
       |   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    25 | ).render(
    26 | <React.StrictMode>
    27 |   <StyledEngineProvider injectFirst>


ERROR in src/pages/AdminApp/Users/Blogs/Editor/BlogEditor.tsx:13:13

TS2339: Property 'body' does not exist on type '{}'.
    11 |     const [saving, setSaving] = useState(false);
    12 |     const [loading, setLoading] = useState(true);
  > 13 |     const { body } = content;
       |             ^^^^
    14 |     const { user } = useAuth();
    15 |     const editorRef = useRef();
    16 |


ERROR in src/pages/AdminApp/Users/Blogs/Editor/BlogEditor.tsx:31:26

TS2532: Object is possibly 'undefined'.
    29 |     const handleSaveBlog = () => {
    30 |         setSaving(true)
  > 31 |         const headings = editorRef.current.getHeadings() || []
       |                          ^^^^^^^^^^^^^^^^^
    32 |         if(headings.length == 0) return setSaving(false)
    33 |         db.doc(`/blogs/${slug}`).set({
    34 |             ...content,


ERROR in src/pages/AdminApp/Users/Blogs/Editor/BlogEditor.tsx:37:24

TS2531: Object is possibly 'null'.
    35 |             title: headings[0].title,
    36 |             body: editedBody,
  > 37 |             authorUid: user.uid,
       |                        ^^^^
    38 |             views: 0,
    39 |             description: editedBody.substring(0, 200),
    40 |             postedOn: firebase.firestore.FieldValue.serverTimestamp()


ERROR in src/pages/AdminApp/Users/Blogs/Editor/BlogEditor.tsx:51:21

TS2322: Type 'MutableRefObject<undefined>' is not assignable to type 'Ref<ReactQuill> | undefined'.
  Type 'MutableRefObject<undefined>' is not assignable to type 'RefObject<ReactQuill>'.
    Types of property 'current' are incompatible.
      Type 'undefined' is not assignable to type 'ReactQuill | null'.
    49 |             {!loading && <article className="prose">
    50 |                 {<Editor 
  > 51 |                     ref={editorRef}
       |                     ^^^
    52 |                     key={slug}
    53 |                     defaultValue={body}
    54 |                     readOnly={saving}


ERROR in src/pages/AdminApp/Users/Blogs/Editor/BlogEditor.tsx:55:52

TS2349: This expression is not callable.
  Type 'String' has no call signatures.
    53 |                     defaultValue={body}
    54 |                     readOnly={saving}
  > 55 |                     onChange={val => setEditedBody(val())} 
       |                                                    ^^^
    56 |                     />}
    57 |             </article>}
    58 |             <button


ERROR in src/pages/AdminApp/Users/Users.tsx:12:13

TS2339: Property 'state' does not exist on type '{}'.
    10 |     const [userState, setUserState] = useState({});
    11 |     const { name, email, country, major, hsGradYear, isMtr } = userDetails;
  > 12 |     const { state, last_changed, version } = userState || {};
       |             ^^^^^
    13 |     useEffect(() => {
    14 |         if(!user) return;
    15 |         //Get user status


ERROR in src/pages/AdminApp/Users/Users.tsx:12:20

TS2339: Property 'last_changed' does not exist on type '{}'.
    10 |     const [userState, setUserState] = useState({});
    11 |     const { name, email, country, major, hsGradYear, isMtr } = userDetails;
  > 12 |     const { state, last_changed, version } = userState || {};
       |                    ^^^^^^^^^^^^
    13 |     useEffect(() => {
    14 |         if(!user) return;
    15 |         //Get user status


ERROR in src/pages/AdminApp/Users/Users.tsx:12:34

TS2339: Property 'version' does not exist on type '{}'.
    10 |     const [userState, setUserState] = useState({});
    11 |     const { name, email, country, major, hsGradYear, isMtr } = userDetails;
  > 12 |     const { state, last_changed, version } = userState || {};
       |                                  ^^^^^^^
    13 |     useEffect(() => {
    14 |         if(!user) return;
    15 |         //Get user status


ERROR in src/pages/AdminApp/Users/Users.tsx:59:26

TS2345: Argument of type '{ id: string; }[]' is not assignable to parameter of type 'SetStateAction<never[]>'.
  Type '{ id: string; }[]' is not assignable to type 'never[]'.
    Type '{ id: string; }' is not assignable to type 'never'.
    57 |             .orderBy('name')
    58 |             .onSnapshot(snapshot => {
  > 59 |                 setUsers(snapshot.docs.map(doc => (
       |                          ^^^^^^^^^^^^^^^^^^^^^^^^^^
  > 60 |                     { id: doc.id, ...doc.data() }
       | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  > 61 |                 )));
       | ^^^^^^^^^^^^^^^^^^^
    62 |             });
    63 |     }, [user]);
    64 |


ERROR in src/pages/AdminApp/Users/Users.tsx:87:36

TS2531: Object is possibly 'null'.
    85 |             <div className="flex flex-col space-y-3">
    86 |                 {users.map(userDetails => (
  > 87 |                     <UserCard key={user.id} uid={userDetails.id} userDetails={userDetails} />
       |                                    ^^^^
    88 |                 ))}
    89 |             </div>
    90 |             


ERROR in src/pages/AdminApp/Users/Users.tsx:87:41

TS2339: Property 'id' does not exist on type 'User'.
    85 |             <div className="flex flex-col space-y-3">
    86 |                 {users.map(userDetails => (
  > 87 |                     <UserCard key={user.id} uid={userDetails.id} userDetails={userDetails} />
       |                                         ^^
    88 |                 ))}
    89 |             </div>
    90 |             


ERROR in src/pages/AdminApp/Users/Users.tsx:87:62

TS2339: Property 'id' does not exist on type 'never'.
    85 |             <div className="flex flex-col space-y-3">
    86 |                 {users.map(userDetails => (
  > 87 |                     <UserCard key={user.id} uid={userDetails.id} userDetails={userDetails} />
       |                                                              ^^
    88 |                 ))}
    89 |             </div>
    90 |             


ERROR in src/pages/Fallback/NoMatch.tsx:1:20

TS2305: Module '"react-router"' has no exported member 'withRouter'.
  > 1 | import { Navigate, withRouter } from "react-router"
      |                    ^^^^^^^^^^
    2 |
    3 | const NoMatch = (props) => {
    4 |     return <Navigate to={{state: {noMatch: true}}} />


ERROR in src/pages/Fallback/NoMatch.tsx:4:13

TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
    2 |
    3 | const NoMatch = (props) => {
  > 4 |     return <Navigate to={{state: {noMatch: true}}} />
      |             ^^^^^^^^
    5 | }
    6 |
    7 | // const ProviderHOC = (NotFoundRoute) => {


ERROR in src/pages/Fallback/NoMatch.tsx:4:27

TS2322: Type '{ state: { noMatch: true; }; }' is not assignable to type 'To'.
  Object literal may only specify known properties, and 'state' does not exist in type 'Partial<Path>'.
    2 |
    3 | const NoMatch = (props) => {
  > 4 |     return <Navigate to={{state: {noMatch: true}}} />
      |                           ^^^^^^^^^^^^^^^^^^^^^^
    5 | }
    6 |
    7 | // const ProviderHOC = (NotFoundRoute) => {


ERROR in src/pages/Home/Home.tsx:13:10

TS2305: Module '"react-router-dom"' has no exported member 'Redirect'.
    11 | import {Helmet} from "react-helmet";
    12 | import { useAuth } from '../../hooks/useAuth';
  > 13 | import { Redirect } from "react-router-dom";
       |          ^^^^^^^^
    14 |
    15 |
    16 | export default function Home() {


ERROR in src/pages/MainApp/Mentors/Mentors.tsx:29:56

TS2339: Property 'connectedMentees' does not exist on type '{ id: string; }'.
    27 |             })
    28 |
  > 29 |             const currentMentors = allMentors.filter(({connectedMentees, id}) => !(connectedMentees || []).includes(user?.uid) && id !== user?.uid)
       |                                                        ^^^^^^^^^^^^^^^^
    30 |
    31 |             setMentors(currentMentors)
    32 |             logEvent('Loaded Mentors',{


ERROR in src/pages/MainApp/Mentors/Mentors.tsx:31:24

TS2345: Argument of type '{ id: string; }[]' is not assignable to parameter of type 'SetStateAction<never[]>'.
  Type '{ id: string; }[]' is not assignable to type 'never[]'.
    Type '{ id: string; }' is not assignable to type 'never'.
    29 |             const currentMentors = allMentors.filter(({connectedMentees, id}) => !(connectedMentees || []).includes(user?.uid) && id !== user?.uid)
    30 |
  > 31 |             setMentors(currentMentors)
       |                        ^^^^^^^^^^^^^^
    32 |             logEvent('Loaded Mentors',{
    33 |                 mentorsLoaded: currentMentors.length,
    34 |                 mentorsList: currentMentors.map(({name}) => name)


ERROR in src/pages/MainApp/Mentors/Mentors.tsx:34:51

TS2339: Property 'name' does not exist on type '{ id: string; }'.
    32 |             logEvent('Loaded Mentors',{
    33 |                 mentorsLoaded: currentMentors.length,
  > 34 |                 mentorsList: currentMentors.map(({name}) => name)
       |                                                   ^^^^
    35 |             })
    36 |             setMentorsLoaded(true)
    37 |         })


ERROR in src/pages/MainApp/Mentors/Mentors.tsx:50:62

TS2339: Property 'id' does not exist on type 'never'.
    48 |                     <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 grid-flow-row justify-start  gap-4 -mt-12 flex-1">
    49 |                         {mentors.map((props) => 
  > 50 |                             <Grow in timeout={50} key={props.id}>
       |                                                              ^^
    51 |                                 <MentorCard {...props} />
    52 |                             </Grow>
    53 |                         )}


ERROR in src/pages/MainApp/ProfilePage/ProfilePage.tsx:31:13

TS2339: Property 'name' does not exist on type '{}'.
    29 |     const [profileFound, setProfileFound] = useState(true);
    30 |     
  > 31 |     const { name, bio, socials, isMtr } = userDetails || {};
       |             ^^^^
    32 |
    33 |     //If profileId is userId, then redirect to profile page
    34 |     useEffect(() => {


ERROR in src/pages/MainApp/ProfilePage/ProfilePage.tsx:31:19

TS2339: Property 'bio' does not exist on type '{}'.
    29 |     const [profileFound, setProfileFound] = useState(true);
    30 |     
  > 31 |     const { name, bio, socials, isMtr } = userDetails || {};
       |                   ^^^
    32 |
    33 |     //If profileId is userId, then redirect to profile page
    34 |     useEffect(() => {


ERROR in src/pages/MainApp/ProfilePage/ProfilePage.tsx:31:24

TS2339: Property 'socials' does not exist on type '{}'.
    29 |     const [profileFound, setProfileFound] = useState(true);
    30 |     
  > 31 |     const { name, bio, socials, isMtr } = userDetails || {};
       |                        ^^^^^^^
    32 |
    33 |     //If profileId is userId, then redirect to profile page
    34 |     useEffect(() => {


ERROR in src/pages/MainApp/ProfilePage/ProfilePage.tsx:31:33

TS2339: Property 'isMtr' does not exist on type '{}'.
    29 |     const [profileFound, setProfileFound] = useState(true);
    30 |     
  > 31 |     const { name, bio, socials, isMtr } = userDetails || {};
       |                                 ^^^^^
    32 |
    33 |     //If profileId is userId, then redirect to profile page
    34 |     useEffect(() => {


ERROR in src/pages/MainApp/ProfilePage/ProfilePage.tsx:54:28

TS2345: Argument of type 'DocumentData | undefined' is not assignable to parameter of type 'SetStateAction<{}>'.
  Type 'undefined' is not assignable to type 'SetStateAction<{}>'.
    52 |         };
    53 |         return db.doc(`users/${profileId}`).onSnapshot(async snap => {
  > 54 |             setUserDetails(snap.data());
       |                            ^^^^^^^^^^^
    55 |
    56 |             //THis means that profile does not exist
    57 |             if (!snap.data()){


ERROR in src/pages/MainApp/ProfilePage/ProfilePage.tsx:108:86

TS2322: Type '{ userDetails: {}; isUser: boolean; isMentor: any; }' is not assignable to type 'IntrinsicAttributes & { userDetails: any; isUser: any; }'.
  Property 'isMentor' does not exist on type 'IntrinsicAttributes & { userDetails: any; isUser: any; }'.
    106 |                     <div className=" hidden md:flex flex-col h-app w-sidebar pl-3 mr-6">
    107 |                         <div className="fixed flex flex-col cc_cursor h-app">
  > 108 |                             <EducationCard userDetails={userDetails} isUser={isUser} isMentor={isMtr} />
        |                                                                                      ^^^^^^^^
    109 |                             <SocialsCard socials={socials} isUser={isUser}/>
    110 |                         </div>
    111 |                     </div>
