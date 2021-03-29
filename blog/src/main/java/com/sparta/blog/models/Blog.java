package com.sparta.blog.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter // get 함수를 일괄적으로 만들어줍니다.
@NoArgsConstructor // 기본 생성자를 만들어줍니다.
@Entity // DB 테이블 역할을 합니다.
public class Blog extends Timestamped{
//ID가 자동으로 생성 및 증가합니다.
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String contents;

    @Column(nullable = false)
    private String name;


    // 글 생성 시 이용합니다.
    public Blog(BlogRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.name = requestDto.getName();
        this.contents = requestDto.getContents();

    }
    //블로그 글 변경시 이용합니다.
    public void update(BlogRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.name = requestDto.getName();
        this.contents = requestDto.getContents();
    }
}

