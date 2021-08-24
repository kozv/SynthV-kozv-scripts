function getClientInfo() {
  return {
      name: SV.T('Duplicate note'),
      category: SV.T('edit note'),
      author: 'Trpo',
      versionNumber: 1,
      minEditorVersion: 66304,
  };
}

function getTranslations(langCode) {
  switch (langCode) {
      case 'ja-jp':
          return [
              ['edit note', 'ノート編集'],
              ['Duplicate note', 'ノートの複製'],
          ];
  }
  return [];
}


function main() {
  //作業中しているグループを取得する
  var mainRef = SV.getMainEditor().getCurrentGroup();
  var mainGroup = mainRef.getTarget();
  
  //選択しているノートを取得
  var selectionState = SV.getMainEditor().getSelection();
  var selectedNotes = selectionState.getSelectedNotes();
  
  if (selectedNotes.length > 0) {//選択しているノートがあるときのみ実行する
    //選択しているノートの開始位置、長さ、ピッチ
    var lastNote = selectedNotes[selectedNotes.length - 1]
    var onset = lastNote.getOnset();
    var duration =　lastNote.getDuration();
    var pitch = lastNote.getPitch();
    
    //ノートを作成
    var n = SV.create('Note');
    
    //新しいノートの開始位置
    var newOnset = onset + duration;

    n.setTimeRange(newOnset, duration);
    n.setPitch(pitch);
    n.setLyrics('la');

    //無名グループにノートを追加
    var index = mainGroup.addNote(n);

    //ノートの選択を解除して、新しいノートを選択
    for (var i = 0; i < selectedNotes.length; i++) {
      selectionState.unselectNote(selectedNotes[i]);
    }
    selectionState.selectNote(mainGroup.getNote(index));
  }
  SV.finish();
}