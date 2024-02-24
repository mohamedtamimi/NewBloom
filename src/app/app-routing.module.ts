import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './app.main.component';

import { CategoryComponent } from './definition/category/category.component';
import { RegionComponent } from './definition/region/region.component';
import { AuthorComponent } from './definition/author/author.component';
import { ArticlelistComponent } from './articles/articlelist/articlelist.component';
import { ArticledetailsComponent } from './articles/articledetails/articledetails.component';
import { ArticlepublishlistComponent } from './articles/articlepublishlist/articlepublishlist.component';
import { NewsheaderComponent } from './articles/newsheader/newsheader.component';
import { HeadlinedetailsComponent } from './headline/headlinedetails/headlinedetails.component';
import { HeadlinelistComponent } from './headline/headlinelist/headlinelist.component';
import { HeadlinepublishComponent } from './headline/headlinepublish/headlinepublish.component';
import { BreakingNewsHeaderComponent } from './headline/breaking-news-header/breaking-news-header.component';
import { HomepageComponent } from './website/homepage/homepage.component';
import { NewsappcomponentComponent } from './website/newsappcomponent/newsappcomponent.component';
import { NewsarticleComponent } from './website/newsarticle/newsarticle.component';
import { LoginComponent } from './login/login.component';
import { MetalComponent } from './website/metal/metal.component';
import { CategoryheaderComponent } from './articles/categoryheader/categoryheader.component';
import { RegionheaderComponent } from './articles/regionheader/regionheader.component';
import { TagsComponent } from './definition/tags/tags.component';
import { NewsFilterComponent } from './website/news-filter/news-filter.component';
import { ContactusComponent } from './website/contactus/contactus.component';
import { PrivacyPolicyComponent } from './website/privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './website/about-us/about-us.component';
import { PrivacyComponent } from './website/privacy/privacy.component';
import { UsersComponent } from './users/users/users.component';
import { RolesComponent } from './users/roles/roles.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: "definearticle",
                component: AppMainComponent,
                children: [
                  { path: ":id/:id2", component: ArticledetailsComponent },
                ],
              },
              {
                path: "categoryarticles",
                component: AppMainComponent,
                children: [
                  { path: ":id/:id2", component: ArticlelistComponent },
                ],
              },
              {
                path: "regionarticles",
                component: AppMainComponent,
                children: [
                  { path: ":id/:id2", component: ArticlelistComponent },
                ],
              },
              {
                path: "headline",
                component: AppMainComponent,
                children: [
                  { path: ":id/:id2", component: HeadlinedetailsComponent },
                ],
              },
            {
                path: 'dashboard', component: AppMainComponent,
                canActivate: [AuthGuard],
                children: [
                   
                    {path: 'category', component: CategoryComponent},
                    {path: 'region', component: RegionComponent},
                    {path: 'author', component: AuthorComponent},
                    {path: 'tags', component: TagsComponent},
                    {path: 'articlelist', component: ArticlelistComponent},
                    //{path: 'definearticle', component: ArticledetailsComponent},
                    {path: 'publishlist', component: ArticlepublishlistComponent},
                    {path: 'assignheader', component: NewsheaderComponent},

                    {path: 'lstheadline', component: HeadlinelistComponent},
                    {path: 'publishheadline', component: HeadlinepublishComponent},
                    {path: 'newsheadline', component: BreakingNewsHeaderComponent},
                    {path: 'categorylist', component: CategoryheaderComponent},
                    {path: 'regionlist', component: RegionheaderComponent},
                    {path: 'users', component: UsersComponent },
                    {path: 'roles', component: RolesComponent },

                ],
            },
            {
              path: "login",component: NewsappcomponentComponent,
              // canActivate: [GuestGuard],
              children: [
                { path: "", component: LoginComponent },
              ],
            },
            {
              path: "",
              component: NewsappcomponentComponent,
              children: [
                { path: "", component: HomepageComponent },
              ],
            },
            {
              path: "home",
              component: NewsappcomponentComponent,
              children: [
                { path: "", component: HomepageComponent },
              ],
            },
            {
              path: "metal",
              component: NewsappcomponentComponent,
              children: [
                { path: "", component: MetalComponent },
              ],
            },{
              path: "AdvertiseWithUs",
              component: ContactusComponent,
              children: [
                { path: "", component: ContactusComponent },
              ],
            },
            {
              path: "privacypolicy",
              component: PrivacyPolicyComponent,
              children: [
                { path: "", component: PrivacyPolicyComponent },
              ],
            },
            {
              path: "aboutus",
              component: AboutUsComponent,
              children: [
                { path: "", component: AboutUsComponent },
              ],
            },
            {
              path: "privacy",
              component: PrivacyComponent,
              children: [
                { path: "", component: PrivacyComponent },
              ],
            },
            {
              path: "news",
              component: NewsappcomponentComponent,
              children: [
                { path: ":id", component: NewsarticleComponent },
              ],
            },
            {
              path: "filter",
              component: NewsappcomponentComponent,
              children: [
                { path: ":type/:id", component: NewsFilterComponent },
              ],
            },
            {path:'pages/login', component: LoginComponent},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
