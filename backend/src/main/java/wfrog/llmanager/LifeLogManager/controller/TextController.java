package wfrog.llmanager.LifeLogManager.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TextController {

    @CrossOrigin(origins = "http://localhost:3000") // CORSの設定(ここで指定したオリジン以外からはAPIを叩けない)
    @PostMapping("/submit")
    public ResponseEntity<String> submitText(@RequestBody String text) {
        // TODO:テキストをデータベースに保存する処理などを行う
        return ResponseEntity.ok(text);
    }
}
