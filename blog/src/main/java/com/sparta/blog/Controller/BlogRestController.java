package com.sparta.blog.Controller;

import com.sparta.blog.Service.BlogService;
import com.sparta.blog.models.Blog;
import com.sparta.blog.models.BlogRepository;
import com.sparta.blog.models.BlogRequestDto;
import com.sparta.blog.models.Timestamped;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController("/")
public class BlogRestController extends Timestamped {


    private final BlogService blogService;
    private final BlogRepository blogRepository;
//등록된 글 조회하기
    @GetMapping("/api/bloglists")
    public List<Blog> getBlogs(){
//        LocalDateTime start = LocalDateTime.now().minusDays(1);
//        LocalDateTime end = LocalDateTime.now();
        return blogRepository.findAllByOrderByModifiedAt(); //AtBetweenOrderByModifiedAtDesc(start, end);
    }
//아이디에 따라 디테일 페이지로 넘어가기
    @GetMapping("/api/detail/{id}")
    public Blog getList(@PathVariable Long id) {
        return blogRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("null")
        );
    }
    //모델앤뷰 페이지로 내용물 넘겨주기
    @RequestMapping(value="/detail01", method = RequestMethod.GET)
    public ModelAndView detail01() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("detail01.html");
        return modelAndView;
    }

//아이디 값으로 페이지 이동
//    @RequestMapping(value = "/detail01", method = RequestMethod.GET)
//    public ModelAndView getDetail01(){
//        ModelAndView modelAndView = new ModelAndView();
//        modelAndView.setViewName("detail01.html");
//        return modelAndView;
////        return blogRepository.findById(id).orElseThrow(
////                () -> new IllegalArgumentException("null")
////        );
//    }


    //새로운글 등록
    @PostMapping("/api/bloglists")
    public Blog createBlog(@RequestBody BlogRequestDto requestDto){
        Blog blog = new Blog(requestDto);
        return blogRepository.save(blog);

    }

    @PutMapping("/api/bloglists/{id}")
    public Long updateProduct(@PathVariable Long id, @RequestBody BlogRequestDto requestDto){
        return blogService.update(id,requestDto);
    }


    @DeleteMapping("/api/bloglists/{id}")
    public Long deleteBlog(@PathVariable Long id) {
        blogRepository.deleteById(id);
        return id;
    }




}
