import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { StyleClassModule } from 'primeng/styleclass';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import {EditorModule} from 'primeng/editor';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import {DockModule} from 'primeng/dock';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigComponent } from './app.config.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ArticlelistComponent } from './articles/articlelist/articlelist.component';
import { ArticledetailsComponent } from './articles/articledetails/articledetails.component';
import { CategoryComponent } from './definition/category/category.component';
import { RegionComponent } from './definition/region/region.component';
import { ArticlepublishlistComponent } from './articles/articlepublishlist/articlepublishlist.component';
import { AuthorComponent } from './definition/author/author.component';
import { GlobalService } from './services/global.service';
import { UtilitiesService } from './services/utilities.service';
import { MessageService } from 'primeng/api';
import { NewsheaderComponent } from './articles/newsheader/newsheader.component';
import { HeadlinedetailsComponent } from './headline/headlinedetails/headlinedetails.component';
import { HeadlinelistComponent } from './headline/headlinelist/headlinelist.component';
import { HeadlinepublishComponent } from './headline/headlinepublish/headlinepublish.component';
import { BreakingNewsHeaderComponent } from './headline/breaking-news-header/breaking-news-header.component';
import { HomepageComponent } from './website/homepage/homepage.component';
import { NewsarticleComponent } from './website/newsarticle/newsarticle.component';
import { NewsappcomponentComponent } from './website/newsappcomponent/newsappcomponent.component';
import { HeadlineComponent } from './website/headline/headline.component';
import { NewsbycategoryComponent } from './website/newsbycategory/newsbycategory.component';
import { NewsbyregionComponent } from './website/newsbyregion/newsbyregion.component';
import { MetalComponent } from './website/metal/metal.component';
import { CryptoComponent } from './website/crypto/crypto.component';
import { WeatherComponent } from './website/weather/weather.component';
import { LoginComponent } from './login/login.component';
import { AppCodeModule } from './app.code.component';
import { CountryService } from './demo/service/countryservice';
import { CustomerService } from './demo/service/customerservice';
import { EventService } from './demo/service/eventservice';
import { IconService } from './demo/service/iconservice';
import { NodeService } from './demo/service/nodeservice';
import { PhotoService } from './demo/service/photoservice';
import { ProductService } from './demo/service/productservice';
import { MenuService } from './demo/service/app.menu.service';
import { ConfigService } from './demo/service/app.config.service';
import { MarketheaderComponent } from './website/marketheader/marketheader.component';
import { AgmCoreModule } from '@agm/core';
import { CategoryheaderComponent } from './articles/categoryheader/categoryheader.component';
import { RegionheaderComponent } from './articles/regionheader/regionheader.component';
import { TagsComponent } from './definition/tags/tags.component';
import { TranslatePipe } from './translate';
import { SafePipe } from './shared/safe.pipe';
import { NewsFilterComponent } from './website/news-filter/news-filter.component';
import { StickyMenuDirective } from './shared/sticky-menu.directive';
import { ContactusComponent } from './website/contactus/contactus.component';
import { PrivacyPolicyComponent } from './website/privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './website/about-us/about-us.component';
import { PrivacyComponent } from './website/privacy/privacy.component';
import { UsersComponent } from './users/users/users.component';
import { InputComponent } from './shared/input/input.component';
import { RolesComponent } from './users/roles/roles.component';
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
  }


@NgModule({
    imports: [
      AppCodeModule,
      EditorModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
      
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        DockModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        ChipModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        ImageModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TagModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        
        TooltipModule,
        TreeModule,
        TreeSelectModule,
        TreeTableModule,
        VirtualScrollerModule,
        StyleClassModule,
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      }),
          AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDFlroZ5nYwniDcYeVAhbpCUK0AtuTpmFo',
            libraries: ['places']
          }),
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppTopBarComponent,
        AppFooterComponent,
        StickyMenuDirective,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        SafePipe ,
        ArticlelistComponent,
        ArticledetailsComponent,
        CategoryComponent,
        RegionComponent,
        ArticlepublishlistComponent,
        AuthorComponent,
        NewsheaderComponent,
        HeadlinedetailsComponent,
        HeadlinelistComponent,
        HeadlinepublishComponent,
        BreakingNewsHeaderComponent,
        HomepageComponent,
        NewsarticleComponent,
        NewsappcomponentComponent,
        HeadlineComponent,
        NewsbycategoryComponent,
        NewsbyregionComponent,
        MetalComponent,
        CryptoComponent,
        WeatherComponent,
        LoginComponent,
        MarketheaderComponent,
        CategoryheaderComponent,
        RegionheaderComponent,
        TagsComponent,
        NewsFilterComponent,
        ContactusComponent,
        PrivacyPolicyComponent,
        AboutUsComponent,
        PrivacyComponent,
     UsersComponent,
     RolesComponent,
        
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
       GlobalService,UtilitiesService,MessageService,CountryService, CustomerService, EventService, IconService, NodeService,
       PhotoService, ProductService, MenuService, ConfigService,TranslatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
