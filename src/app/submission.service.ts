import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
	//Variables
	submission  : Observable<any> = new Observable<any>
	submissions : Observable<any[]> = new Observable<any[]>

  	constructor(
  		private http: HttpClient,
  		private appvar: AppvarsService
  	) { }

  	saveSubmission(obj:any, callback:any){
  		this.submission = this.http.post<any>(this.appvar.server+'/savesubmission', obj)
  		this.submission.subscribe(
  			data => {
          console.log('result2 data', data)
  				callback(data)
  			},
  			err => {
          console.log('result2 err', err)
  				callback(err)
  			}
  		)
  	}
    getPadiSubmissions(callback:any){
  		this.submissions = this.http.get<any[]>(this.appvar.server+'/getpadisubmissions')
  		this.submissions.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
    }
  	getSubmissions(callback:any){
  		this.submissions = this.http.get<any[]>(this.appvar.server+'/getsubmissions')
  		this.submissions.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}

// submission
  	getSubmissionPage(obj:any, callback:any){
  		this.submission = this.http.get<any>(this.appvar.server+'/getsubmissionpage/'+obj.status+'/'+obj.pageIndex+'/'+obj.pageSize)
  		this.submission.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}

  	getSubmissionCount(obj:any, callback:any){
  		this.submission = this.http.get<any>(this.appvar.server+'/getsubmissioncount/'+obj.status)
  		this.submission.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}

  	searchSubmission(obj:any, callback:any){
  		this.submission = this.http.post<any>(this.appvar.server+'/searchsubmission',obj)
  		this.submission.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}

  	searchSubmissionCount(obj:any, callback:any){
  		this.submission = this.http.post<any>(this.appvar.server+'/searchsubmissioncount',obj)
  		this.submission.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}

    setSubmissionStatus(obj:any, callback:any){
      this.submission = this.http.get<any>(this.appvar.server+'/setsubmissionstatus/'+obj.id+'/'+obj.status)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }

    updateSubmission(obj:any, callback:any){
      this.submission = this.http.post<any>(this.appvar.server+'/updatesubmission', obj)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    updateFinalPrice(obj:any,callback:any){
      this.submission = this.http.post<any>(this.appvar.server+'/updatefinalprice', obj)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    updateFinalPriceBySubmissionId(obj:any,callback:any){
      this.submission = this.http.post<any>(this.appvar.server+'/updatefinalpricebysubmissionid', obj)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
// 6 doa yang terus dirutinkan: surga, rezeki husnul khotimah, istiqomah,diampuni dosa,hidayah,terhindar dari segala fitnah yang merusak agama 
  	getSubmissionDetailPage(obj:any, callback:any){
  		this.submission = this.http.get<any>(this.appvar.server+'/getsubmissiondetailpage/'+obj.id+'/'+obj.pageIndex+'/'+obj.pageSize)
  		this.submission.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}

  	getSubmissionDetailCount(obj:any, callback:any){
  		this.submission = this.http.get<any>(this.appvar.server+'/getsubmissiondetailcount/'+obj.id)
  		this.submission.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}

  	searchSubmissionDetail(obj:any, callback:any){
      console.log("obj",obj)
  		this.submission = this.http.post<any>(this.appvar.server+'/searchsubmissiondetail',obj)
  		this.submission.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}

  	searchSubmissionDetailCount(obj:any, callback:any){
  		this.submission = this.http.post<any>(this.appvar.server+'/searchSubmissiondetailcount',obj)
  		this.submission.subscribe(
  			data => {          
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}
    
    getallsubmissiondetailpage(obj:any, callback:any){

      this.submission = this.http.get<any>(this.appvar.server+'/getallsubmissiondetailpage/'+obj.status+'/'+obj.pageIndex+'/'+obj.pageSize)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }

    getAllSubmissionDetailCount(obj:any, callback:any){
      this.submission = this.http.get<any>(this.appvar.server+'/getallsubmissiondetailcount/'+obj.status)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }

    saveSubmissionDetail(obj:any, callback:any){
      console.log('obj',obj)
      this.submission = this.http.post<any>(this.appvar.server+'/savesubmissiondetail', obj)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }

    updatesubmissiondetail(obj:any, callback:any){
      console.log('obj',obj)
      this.submission = this.http.post<any>(this.appvar.server+'/updatesubmissiondetail', obj)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    updatesalessubmission(obj:any,callback:any){
      this.submission = this.http.post<any>(this.appvar.server+'/updatesalessubmission', obj)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    updatesalessubmissiondetail(obj:any,callback:any){
      this.submission = this.http.post<any>(this.appvar.server+'/updatesalessubmissiondetail', obj)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    setSubmissionDetailStatus(obj:any, callback:any){
      this.submission = this.http.get<any>(this.appvar.server+'/setsubmissiondetailstatus/'+obj.id+'/'+obj.status)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    setSubmissionDetailStatusBySubmissionId(obj:any, callback:any){
      this.submission = this.http.get<any>(this.appvar.server+'/setsubmissiondetailstatusbysubmissionid/'+obj.id+'/'+obj.status)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    setGoodReceived(obj:any,callback:any){
      console.log('OBJ Received',obj)
      this.submission = this.http.post<any>(this.appvar.server+'/setgoodreceived/',obj)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
// realization
    getSubmissionById(urlid:any, callback:any){
      this.submission = this.http.get<any>(this.appvar.server+'/getsubmissionbyid/'+urlid)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    getSubmissionByRole(obj:any,callback:any){
      console.log('obj',obj)
      this.submission = this.http.post<any>(this.appvar.server+'/getsubmissionbyrole', obj)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )

    }
    getSubmissionDetails(urlid:any, callback:any){
      this.submission = this.http.get<any>(this.appvar.server+'/getsubmissiondetails/'+urlid)
      this.submission.subscribe(
        data => {
          console.log("getSubmissionDetails Data",data)
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }

    getSubmissionDetail(urlid:any, callback:any){
      this.submission = this.http.get<any>(this.appvar.server+'/getsubmissiondetail/'+urlid)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    getSubmissionDetailBySubmissionId(urlid:any,callback:any){
      this.submission = this.http.get<any>(this.appvar.server+'/getsubmissiondetailbysubmissionid/'+urlid)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    getRealizationDetails(urlid:any, callback:any){
      this.submission = this.http.get<any>(this.appvar.server+'/getrealizationdetails/'+urlid)
      this.submission.subscribe(
        data => {
          console.log("getrealizationdetails Data",data)
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }

//reject
    updateRejectReason(obj:any, callback:any){
      this.submission = this.http.post<any>(this.appvar.server+'/updaterejectreason', obj)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    updateRejectReasonBySubmissionId(obj:any, callback:any){
      this.submission = this.http.post<any>(this.appvar.server+'/updaterejectreasonbysubmissionid', obj)
      this.submission.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }

  //Vendor comparison
  saveSubmissionDetailVendor(vendor:any, callback:any){
    console.log("VENDor params to send",vendor)
    this.submission = this.http.post<any>(this.appvar.server+'/savesubmissiondetailvendor', vendor)
    this.submission.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  deleteVendorToCompare(vendor:any,callback:any){
    console.log("VENDor params to send",vendor)
    this.submission = this.http.post<any>(this.appvar.server+'/removesubmissiondetailvendor', vendor)
    this.submission.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  removeSubmissionDetailVendor(vendor:any, callback:any){
    this.submission = this.http.post<any>(this.appvar.server+'/removesubmissiondetailvendor', vendor)
    this.submission.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }

  getSubmissionDetailVendor(submissionDetailId:any, callback:any){
    this.submission = this.http.get<any>(this.appvar.server+'/getsubmissiondetailvendor/'+submissionDetailId)
    this.submission.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getbudget(obj:any,callback:any){
    this.submission = this.http.get<any>(
      this.appvar.server+'/getbudget/'+obj.city_id+'/'+obj.year+'/'+obj.quarter+'/'+obj.division
    )
    this.submission.subscribe(
      data => {
        console.log("GET BUDGET",data)
        callback(data)
      },
      err => {
        callback(err)
      }
    )

  }
  getcitybudgetlimit(obj:any,callback:any){
    this.submission = this.http.get<any>(
      this.appvar.server+'/getcitybudgetlimit/'+obj.city_id+'/'+obj.year+'/'+obj.quarter
    )
    this.submission.subscribe(
      data => {
        console.log("GET BUDGET LIMIT",data)
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  uploaditemreceivedbysubmissionid(obj:any,callback:any){
    this.submission = this.http.post(this.appvar.server+'/uploaditemreceivedbysubmissionid',obj)
    this.submission.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  updateVerificationReasonBySubmissionid(obj:any,callback:any){
    this.submission = this.http.post(this.appvar.server+'/updateverificationreasonbysubmissionid',obj)
    this.submission.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  updatePO(obj:any,callback:any){
    this.submission = this.http.post(this.appvar.server+'/updatepo',obj)
    this.submission.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
}
