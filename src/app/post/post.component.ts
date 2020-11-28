import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxHierarchicalGridComponent } from 'igniteui-angular';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  @ViewChild('hgrid1', { read: IgxHierarchicalGridComponent, static: true })
  public hgrid1: IgxHierarchicalGridComponent;
  
  constructor(private postService: PostsService) { }
  title = 'BrainStationDemoClient';
  public posts;
  public pageSize = 2;
  public page = 1;
  public currentPage = 1
  public totalPosts;

  ngOnInit(): void {

    this.postService.getTotalPost()
    .subscribe(count=> {
      this.totalPosts = Array(count).fill(0).map((x,i)=>i);
    });

    this.getPost();
  }

  getPostsNewPage(newPage){
    this.page = newPage;
    this.getPost();
  }
  getPost(){
    this.postService
    .getPosts(this.page)
    .subscribe(posts=> {
      this.posts = posts;
      console.log(this.posts);
    });
  }

  search(e){
    console.log(e.target.value);
    this.postService.getSearchedPosts(e.value)
    .subscribe(post=>{
      console.log("hello");
      this.posts = post;
    });
  }
}
