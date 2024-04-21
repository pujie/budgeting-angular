import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorComponent } from './vendor/vendor.component';
import { VendorSaveComponent } from './vendor-save/vendor-save.component';
import { VendorUpdateComponent } from './vendor-update/vendor-update.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { VendorImageComponent } from './vendor-image/vendor-image.component';
import { ProductComponent } from './product/product.component';
import { ProductSaveComponent } from './product-save/product-save.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategorySaveComponent } from './category-save/category-save.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { SubmissionSaveComponent } from './submission-save/submission-save.component';
import { SubmissionsDetailDetailComponent } from './submissions-detail-detail/submissions-detail-detail.component';
import { SubmissionRejectComponent } from './submission-reject/submission-reject.component';
import { RealizationStaffComponent } from './realization-staff/realization-staff.component';
import { RealizationProductComponent } from './realization-product/realization-product.component';
import { RealizationDetailComponent } from './realization-detail/realization-detail.component';
import { RealizationUpdateComponent } from './realization-update/realization-update.component';
import { PaymentSaveComponent } from './payment-save/payment-save.component';
import { PaymentUpdateComponent } from './payment-update/payment-update.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { HistoryComponent } from './history/history.component';
import { PlafonsComponent } from './plafons/plafons.component';
import { MyproductimagesComponent } from './myproductimages/myproductimages.component';
import { TestgetvendorComponent } from './testgetvendor/testgetvendor.component';
import { PadiSubmissionsComponent } from './padi-submissions/padi-submissions.component';
import { PadiSubmissionDetailComponent } from './padi-submission-detail/padi-submission-detail.component';
import { SubmissionEditComponent } from './submission-edit/submission-edit.component';
import { FinalPriceComponent } from './final-price/final-price.component';
import { GoodsReceivedComponent } from './goods-received/goods-received.component';
import { VendorReviewEditComponent } from './vendor-review-edit/vendor-review-edit.component';
import { VerificationComponent } from './verification/verification.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetAddComponent } from './budget-add/budget-add.component';
import { BudgetTableComponent } from './budget-table/budget-table.component';
import { SummaryComponent } from './summary/summary.component';
import { BudgethistoriesComponent } from './budgethistories/budgethistories.component';
import { UsmanComponent } from './usman/usman.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { PurchaseMonthlyReportComponent } from './purchase-monthly-report/purchase-monthly-report.component';
import { ApprovalComponent } from './approval/approval.component';
import { SalesssubmissionpageComponent } from './salesssubmissionpage/salesssubmissionpage.component';
import { SalessubmissioneditComponent } from './salessubmissionedit/salessubmissionedit.component';
import { PadiadmintestComponent } from './padiadmintest/padiadmintest.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'landing', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'product', component: ProductComponent },
  { path: 'product-save', component: ProductSaveComponent },
  { path: 'product-save/:idvendor/:idcategory', component: ProductSaveComponent},
  { path: 'product-update/:id', component: ProductUpdateComponent },
  { path: 'product-detail/:id', component: ProductDetailsComponent},
  { path: 'vendor', component: VendorComponent },
  { path: 'savevendor', component: VendorSaveComponent },
  { path: 'updatevendor/:id', component: VendorUpdateComponent },
  { path: 'vendor-detail/:id', component: VendorDetailComponent},
  { path: 'vendorimage/:imagetype/:id',component: VendorImageComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'savecategory', component: CategorySaveComponent},
  { path: 'updatecategory/:id', component: CategoryUpdateComponent}, 
  { path: 'category-detail/:id', component: CategoryDetailComponent},
  { path: 'submission-save', component: SubmissionSaveComponent},
  { path: 'submission-edit/:id', component: SubmissionEditComponent},
  { path: 'submission-detail/:id/:review', component: SubmissionsDetailDetailComponent},
  { path: 'submissions-detail-detail/:id', component: SubmissionsDetailDetailComponent},
  { path: 'submissions-reject-detail/:id', component: SubmissionRejectComponent},
  { path: 'realization-staff', component: RealizationStaffComponent},
  { path: 'realization-product', component: RealizationProductComponent},
  { path: 'realization-detail/:id', component: RealizationDetailComponent},
  { path: 'realization-update/:submissionId/:detailId', component: RealizationUpdateComponent},
  { path: 'payment-save/:id',component: PaymentSaveComponent},
  { path: 'payment-update/:realizationid/:id',component: PaymentUpdateComponent},
  { path: 'profile/:id',component: ProfileComponent},
  { path: 'history',component: HistoryComponent},
  { path: 'summary', component: LandingComponent},
  { path: 'zummary', component: SummaryComponent},
  { path: 'plafons', component: PlafonsComponent},
  { path: 'budgets', component: BudgetsComponent},
  { path: 'budget-add', component: BudgetAddComponent},
  { path: 'myproduct',component:MyproductimagesComponent },
  { path: 'padi-submissions',component:PadiSubmissionsComponent },
  { path: 'padi-submission-detail/:id/:review',component:PadiSubmissionDetailComponent },
  { path: 'testgetvendor',component:TestgetvendorComponent},
  { path: 'finalPrice/:submissionId',component:FinalPriceComponent},
  { path: 'goodReceived/:submissionId',component:GoodsReceivedComponent},
  { path: 'vendorReviewEdit/:submissionId',component:VendorReviewEditComponent},
  { path: 'verification/:submissionId',component:VerificationComponent},
  { path: 'budgetTable',component: BudgetTableComponent},
  { path: 'budgethistories',component:BudgethistoriesComponent},
  { path: 'usman',component:UsmanComponent},
  { path: 'manageRole/:id',component:ManageRoleComponent},
  { path: 'purchasemonthlyreport',component:PurchaseMonthlyReportComponent},
  { path: 'approval/:id',component:ApprovalComponent},
  { path: 'salessubmissionpage',component:SalesssubmissionpageComponent},
  { path: 'salessubmissionedit/:submission_id',component:SalessubmissioneditComponent},
  { path: 'padiadmintest',component:PadiadmintestComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
