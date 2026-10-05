const rsync = require('rsyncwrapper')
const process = require('node:process');
const { existsSync } = require('node:fs')
const { readdir } = require('node:fs/promises')
// import { readdir } from 'node:fs/promises';
// console.log(process.argv)
const nodeOrBun = process.argv[0]
const scriptName = process.argv[1]
const source = process.argv[2]
const dest = process.argv[3]
const scriptProgress = process.argv[4] || ''
const scriptExcludes = process.argv[5] || []
console.log(process.argv.length)
console.log(scriptProgress)

// Check if all arguments are given and provide an user advice
if(process.argv.length < 4) {
  console.log("Please use as shown below:")
  console.log("Use Node and the rsync_andreas.cjs File, define a Source-Path and an Destination-Path. You can use optional [--progress]")
  console.log("")
  console.log("   node rsync_andreas.cjs /sourcePath/to/folder /destPath/to/folder --progress")
  console.log(`   node ${scriptName} ${source} ${dest} --progress `)
  console.log("") 
  process.exit()
}
// validate the optional argument is correct
if( scriptProgress && scriptProgress !== '--progress' ) {
  console.log(`Please check your optional argument, maybe you have some typos.`)
  console.log("")  
  console.log("Example:     --progress")
  console.log(`Your ouput:  ${scriptProgress}`)
  console.log("")
  process.exit()
}
//  validate source and dest path exist
// if (!existsSync(source) || !existsSync(dest)) {

const getDirs = async () => {
  try {
    const srcFiles = await readdir(source);
    const destFiles = await readdir(dest);
    console.log("src and dest:", srcFiles, destFiles);
    
    return { srcFiles, destFiles }
  } catch (err) {
    console.error("Sorry, but we could not found:", err.message, err.path );
    process.exit(77)
  }
  // return { srcFiles, destFiles }
}
getDirs()
// const { srcFiles, destFiles } = await getDirs()
  // console.log('Please provide an source and destination path')

// }
// process.exit()
rsync(
  {
    src: source,
    // src: `${__dirname}${source}`,
    dest: dest,
    // dest: `${__dirname}${dest}`,
    progress: true,
    recursive: true,
    times: true,
    dryRun: false,
    compareMode: 'sizeOnly',
    exclude: ['.Trash','.vite-plugin-mkcert','.DS_Store', '.git', '.bun', '.andriod','.nvm','.nux*', 'node_modules', '.npm', '.vscode*', '.CFUser*', '.cache', '*Library', '*Movies/TV','*Music/Music','*Pictures/Photo*', 'Applications']
  },
  // onStdout,
  function (error, stdout, stderr, cmd) { 
    if (error) {
      // failed
      console.log("stderr___",stderr)
    } else {
      // console.log("stdout____",stdollut)
      process.stdout.write(stdout);
      // console.log("cmd___",cmd)
    }
  }
)

    // getDirs()

    // console.log("This is your srcFiles:");
    // console.log(srcFiles);
    // console.log("This is your destFiles:");
    // console.log(destFiles)
    // console.log("This is your source path:");
