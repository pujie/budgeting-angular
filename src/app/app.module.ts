//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatListModule } from '@angular/material/list'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu'
import { MatSelectModule } from '@angular/material/select'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";

//Components
import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';

//Vendor Components
import { VendorComponent, VendorDialog } from './vendor/vendor.component';
import { VendorSaveComponent } from './vendor-save/vendor-save.component';
import { VendorUpdateComponent } from './vendor-update/vendor-update.component';
import { VendorImageComponent } from './vendor-image/vendor-image.component';
import { VendorDetailComponent, VendorDetailDialog } from './vendor-detail/vendor-detail.component';

//Category Components
import { CategoriesComponent, CategoryDialog } from './categories/categories.component';
import { CategorySaveComponent } from './category-save/category-save.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

//Product Components
import { ProductComponent, ProductDialog } from './product/product.component';
import { ProductSaveComponent } from './product-save/product-save.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDetailsComponent, ProductDetailsDialog } from './product-details/product-details.component';

//Login & User Components
import { LoginComponent } from './login/login.component';
import { UserChangepasswordComponent } from './user-changepassword/user-changepassword.component';

//Submission Components
import { SubmissionSaveComponent, SubmissionVendorDialog, SubmissionDetailDialog } from './submission-save/submission-save.component';
import { SubmissionsDetailDetailComponent, SubmissionsDetailDetailDialog } from './submissions-detail-detail/submissions-detail-detail.component';
import { SubmissionRejectComponent } from './submission-reject/submission-reject.component';

//Realization Components
import { RealizationStaffComponent, RealizationStaffDialog } from './realization-staff/realization-staff.component';
import { RealizationProductComponent,RealizationProductDialog } from './realization-product/realization-product.component';
import { RealizationDetailComponent, RealizationDetailProductDialog, RealizationDetailStaffDialog } from './realization-detail/realization-detail.component';
import { RealizationUpdateComponent } from './realization-update/realization-update.component';

import { PaymentSaveComponent } from './payment-save/payment-save.component';
import { PaymentUpdateComponent } from './payment-update/payment-update.component';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { PlafonsComponent, PlafonsDialog } from './plafons/plafons.component';
import { MyproductimagesComponent } from './myproductimages/myproductimages.component';
import { TestgetvendorComponent } from './testgetvendor/testgetvendor.component';
import { PadiSubmissionsComponent } from './padi-submissions/padi-submissions.component';
import { PadiSubmissionDetailComponent } from './padi-submission-detail/padi-submission-detail.component';
import { CommonConfirmerComponent } from './common-confirmer/common-confirmer.component';
import { SubmissionEditComponent } from './submission-edit/submission-edit.component';
import { AddVendorDialogComponent } from './add-vendor-dialog/add-vendor-dialog.component';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { AddVendorImageDialogComponent } from './add-vendor-image-dialog/add-vendor-image-dialog.component';
import { FinalPriceComponent } from './final-price/final-price.component';
import { GoodsReceivedComponent } from './goods-received/goods-received.component';
import { NotesDialogComponent } from './notes-dialog/notes-dialog.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { VendorReviewEditComponent } from './vendor-review-edit/vendor-review-edit.component';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { VerificationComponent } from './verification/verification.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RejectDescriptionDialogComponent } from './reject-description-dialog/reject-description-dialog.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetAddComponent } from './budget-add/budget-add.component';
import { BudgetTableComponent } from './budget-table/budget-table.component';
import { SummaryComponent } from './summary/summary.component';
import { BudgethistoriesComponent } from './budgethistories/budgethistories.component';
import { UsmanComponent } from './usman/usman.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { SubmissionInfoComponent } from './submission-info/submission-info.component';
import { PurchaseMonthlyReportComponent } from './purchase-monthly-report/purchase-monthly-report.component';
import { ApprovalComponent } from './approval/approval.component';
import { ApprovalDialogComponent } from './approval-dialog/approval-dialog.component';
import { SalesssubmissionpageComponent } from './salesssubmissionpage/salesssubmissionpage.component';
import { SalessubmissioneditComponent } from './salessubmissionedit/salessubmissionedit.component';
import { ViewPOComponent } from './view-po/view-po.component';
import { PadiadmintestComponent } from './padiadmintest/padiadmintest.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    VendorComponent,
    VendorDialog,
    VendorSaveComponent,
    VendorUpdateComponent,
    VendorImageComponent,
    VendorDetailComponent,
    VendorDetailDialog,
    VendorImageComponent,
    CategoriesComponent,
    CategoryDialog,
    CategorySaveComponent,
    CategoryUpdateComponent,
    CategoryDetailComponent,
    ProductComponent,
    ProductDialog,
    ProductSaveComponent,
    ProductUpdateComponent,
    ProductDetailsComponent,
    ProductDetailsDialog,
    SubmissionSaveComponent,
    SubmissionVendorDialog,
    SubmissionDetailDialog,
    SubmissionsDetailDetailComponent,
    SubmissionsDetailDetailDialog,
    RealizationStaffComponent,
    RealizationStaffDialog,
    RealizationProductComponent,
    RealizationProductDialog,
    RealizationDetailComponent,
    RealizationDetailProductDialog,
    RealizationDetailStaffDialog,
    RealizationUpdateComponent,
    PaymentSaveComponent,
    PaymentUpdateComponent,
    LandingComponent,
    ProfileComponent,
    LoginComponent,
    UserChangepasswordComponent,    
    HistoryComponent, 
    SubmissionRejectComponent, 
    PlafonsComponent,
    PlafonsDialog,
    MyproductimagesComponent,
    TestgetvendorComponent,
    PadiSubmissionsComponent,
    PadiSubmissionDetailComponent,
    CommonConfirmerComponent,
    SubmissionEditComponent,
    AddVendorDialogComponent,
    AddProductDialogComponent,
    AddVendorImageDialogComponent,
    FinalPriceComponent,
    GoodsReceivedComponent,
    NotesDialogComponent,AddNoteComponent,
    VendorReviewEditComponent,RemoveDialogComponent, VerificationComponent, RejectDescriptionDialogComponent, BudgetsComponent, BudgetAddComponent, BudgetTableComponent, SummaryComponent, BudgethistoriesComponent, UsmanComponent, ManageRoleComponent, SubmissionInfoComponent, PurchaseMonthlyReportComponent, ApprovalComponent, ApprovalDialogComponent, SalesssubmissionpageComponent, SalessubmissioneditComponent, ViewPOComponent, PadiadmintestComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,MatListModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatCardModule,
    MatGridListModule,
    CurrencyMaskModule,MatSnackBarModule
    ],
  providers: [DatePipe, CurrencyPipe,{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    provideAnimationsAsync()],
  entryComponents:[
    UserChangepasswordComponent, 
    ProductDialog,
    VendorDialog, 
    VendorDetailDialog,
    ProductDetailsDialog,
    CategoryDialog, 
    RealizationStaffDialog, 
    RealizationProductDialog, 
    RealizationDetailStaffDialog, 
    RealizationDetailProductDialog,
    SubmissionVendorDialog,
    SubmissionsDetailDetailDialog,
    SubmissionDetailDialog,
    PlafonsDialog,
    CommonConfirmerComponent,
    AddVendorDialogComponent,
    AddProductDialogComponent,
    AddVendorImageDialogComponent,
    NotesDialogComponent,AddNoteComponent,
    RemoveDialogComponent,RejectDescriptionDialogComponent,
    SubmissionInfoComponent,ApprovalDialogComponent,
    ViewPOComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
