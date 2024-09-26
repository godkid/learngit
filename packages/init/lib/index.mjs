import Command from "@leon_test_group/command";

class InitCommand extends Command {
  get command(){
    return 'init [name]';
  }
  get description(){
    return 'Initialize a new project';
  }
  get options(){
    return [
      ['-f, --force', '是否强制更新', false]
    ]
  }

  action([name, opts]){
    console.log('暑促', name, opts);
  }
  
  preAction(){
    console.log('preAction');
  }
  postAction(){
    console.log('postAction');
  }
}

function Init(instance){
  return new InitCommand(instance);
}

export default Init;
