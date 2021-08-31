import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from "./category/category.component"
import { PanelCharacterComponent } from "./panel-character/panel-character.component";
import { PanelSearchComponent } from "./panel-search/panel-search.component";
import { ModalDetailCharacterComponent } from './modals/modal-detail-character/modal-detail-character.component';
import { PanelComicComponent } from './panel-comic/panel-comic.component';
import { ModalDetailComicComponent } from './modals/modal-detail-comic/modal-detail-comic.component';
import { ModalFavoriteCharactersComponent } from './modals/modal-favorite-characters/modal-favorite-characters.component';
import { ModalFavoriteComicsComponent } from './modals/modal-favorite-comics/modal-favorite-comics.component';
import { PanelCreatorsComponent } from './panel-creators/panel-creators.component';
import { PanelEventsComponent } from './panel-events/panel-events.component';
import { PanelSeriesComponent } from './panel-series/panel-series.component';
import { PanelStoriesComponent } from './panel-stories/panel-stories.component';
import { MapComponent } from "./map/map.component";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
    declarations: [
        MenuComponent,
        HeaderComponent,
        CategoryComponent,
        PanelCharacterComponent,
        PanelSearchComponent,
        PanelCreatorsComponent,
        PanelEventsComponent,
        PanelSearchComponent,
        PanelSeriesComponent,
        PanelStoriesComponent,
        ModalDetailCharacterComponent,
        PanelComicComponent,
        ModalDetailComicComponent,
        ModalFavoriteCharactersComponent,
        ModalFavoriteComicsComponent,
        MapComponent
    ],
    exports: [
        MenuComponent,
        HeaderComponent,
        CategoryComponent,
        PanelCharacterComponent,
        PanelSearchComponent,
        PanelCreatorsComponent,
        PanelEventsComponent,
        PanelSearchComponent,
        PanelSeriesComponent,
        PanelStoriesComponent,
        ModalDetailCharacterComponent,
        PanelComicComponent,
        ModalDetailComicComponent,
        ModalFavoriteCharactersComponent,
        ModalFavoriteComicsComponent,
        MapComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        PipesModule,
    ]
})

export class ComponentsModule { }