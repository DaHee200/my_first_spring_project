package com.sparta.blog.Service;


import com.sparta.blog.models.Blog;
import com.sparta.blog.models.BlogRepository;
import com.sparta.blog.models.BlogRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class BlogService {

    private final BlogRepository blogRepository;

    @Transactional// 메소드 동작이 SQL 쿼리문임을 선언합니다.
    public Long update(Long id,BlogRequestDto requestDto) {
        Blog blog = blogRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 아이디가 존재하지 않습니다.")
        );
        blog.update(requestDto);
        return blog.getId();
    }


}
