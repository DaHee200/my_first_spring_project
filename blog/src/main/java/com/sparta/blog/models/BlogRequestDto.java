package com.sparta.blog.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.json.JSONObject;

@Getter
@NoArgsConstructor
public class BlogRequestDto {

    private String title;
    private String name;
    private String contents;
    private Long id;

    public void requestDto(JSONObject requestDto) {
        this.title = requestDto.getString("title");
        this.contents = requestDto.getString("contents");
        this.name = requestDto.getString("name");
        this.id= requestDto.getLong("id");
    }


}

//    public BlogRequestDto(){
//        this.title = title;
//        this.name = name;
//        this.content = content;
//        this.myblog = myblog;
//    }
