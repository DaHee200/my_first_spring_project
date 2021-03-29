package com.sparta.blog.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long>{
    //24시안 후 삭제 없애기
    default List<Blog> findAllByOrderByModifiedAt() {
        return findAllByOrderByModifiedAt();
    }
}
