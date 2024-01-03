import dayjs from "dayjs";
import * as yup from "yup";
import { isWithinNumberDays } from "../../helper/functionCommon";

export const schema = yup.object({
  username: yup.string().required("Tên đăng nhập không bỏ trống"),
  password: yup.string().required("Mật khẩu không bỏ trống"),
  formDate: yup.date().required("Ngày không bỏ trống").nullable(),
});

export const schemas = yup.object({
  transCode: yup.string().required("Mã giao dịch không bỏ trống"),
  partner: yup.string().required("Đối tác không bỏ trống"),
  fromDate: yup.date().required("Tháng không bỏ trống").nullable(),
  toDate: yup.date().required("Năm không bỏ trống").nullable(),
});

export const searchCampaignManagement = yup.object({
  fromDate: yup.date().required("Không được để trống!")
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  toDate: yup
    .date()
    .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  status: yup.string().nullable(),
  campaign: yup.string().nullable(),
});

export const createPromotionFormSchema = yup.object({
  codePromotion: yup.string().required("Mã chiến dịch không bỏ trống"),
  namePromotion: yup.string().required("Tên chiến dịch không bỏ trống"),
  typePromotion: yup.string().required("Loại chiến dịch không bỏ trống"),
  status: yup.string().required("Trạng thái không bỏ trống"),
  fromDate: yup.date().required("Không được để trống!").nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  toDate: yup
    .date()
    .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
});

export const searchPromotionEventForm = yup.object({
  fromDate: yup.date().required("Không được để trống!").nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  toDate: yup
    .date()
    .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  status: yup.string().nullable(),
  eventId: yup.string().nullable(),
  programId: yup.string().nullable(),
  productId: yup.string().nullable(),
  productName: yup.string().nullable(),
  statusExecuted: yup.string().nullable(),
});

export const createPromotionForm = yup.object({
  fromDate: yup.date().required("Không được để trống!").nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  toDate: yup
    .date()
    .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  campaign: yup.string().required("Chiến dịch không được để trống!"),
  promotionType: yup.string().required("Loại CTKM không được để trống!"),
  promotionCode: yup.string().required("Mã CTKM không được để trống!"),
  promotionName: yup.string().required("Tên CTKM không được để trống!"),
  advanceType: yup.string().required("Loại tạm ứng không được để trống!"),
  budget: yup.number().required("Ngân sách không được để trống!"),
  reportNumb: yup.number().required("Số tờ trình không được để trống!"),
  registerNumb: yup.number().required("Số đăng ký không được để trống!"),
});

export const CreatePolicyForm = yup.object({
  fromDate: yup.date().required("Không được để trống!").nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  toDate: yup
    .date()
    .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  campaign: yup.number().required("Chiến dịch không được để trống!"),
  program: yup.number().required("CTKM không được để trống!"),
  policyCode: yup.string().required("Mã chính sách không được để trống!"),
  policyName: yup.string().required("Tên chính sách không được để trống!"),
  rewardType: yup.number().required("Loại thưởng không được để trống!"),
  rewardMethod: yup.number().required("Hình thức trả thưởng không được để trống!").nullable(),
});

export const CreatePolicyRefundForm = yup.object({
  rewardMethod: yup.string().required("Hình thức trả thưởng không được để trống!"),
  type: yup.string().required("Loại không được để trống!"),
  price: yup.string().required("Giá trị KM không được để trống!"),
});

export const CreatePolicyVoucherForm = yup.object({
  rewardMethod: yup.string().required("Hình thức trả thưởng không được để trống!"),
  voucher: yup.string().required("Mã KM không được để trống!"),
  quantity: yup.string().required("Số lượng không được để trống!"),
});

export const CreatePolicyServiceForm = yup.object({
  rewardMethod: yup.string().required("Hình thức trả thưởng không được để trống!"),
  service: yup.string().required("Dịch vụ không được để trống!"),
  quantity: yup.string().required("Số lượng không được để trống!"),
});

export const CreatePolicyDiscountForm = yup.object({
  rewardMethod: yup.string().required("Hình thức trả thưởng không được để trống!"),
  price: yup.string().required("Giá trị KM không được để trống!"),
});

export const SearchAdvancedReimbursement = yup.object({
  fromDate: yup.date().required("Không được để trống!").nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  toDate: yup
    .date()
    .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
});

export const AdvancedPromotion = yup.object({
  advancedFor: yup.string().required("Tạm ứng được để trống!"),
  campaign: yup.string().required("Chiến dịch không được để trống!"),
  promotion: yup.string().required("CTKM không được để trống!"),
  bank: yup.string().required("Ngân hàng không được để trống!"),
  fromAccount: yup.string().required("Tài khoản ngân hàng không được để trống!"),
  toAccount: yup.string().required("Tài khoản ngân hàng không được để trống!"),
  amount: yup.string().required("Số tiền không được để trống!"),
});

export const AdvancedCampaign = yup.object({
  reimbursementFor: yup.string().required("Hoàn ứng được để trống!"),
  campaign: yup.string().required("Chiến dịch không được để trống!"),
  bank: yup.string().required("Ngân hàng không được để trống!"),
  fromAccount: yup.string().required("Tài khoản ngân hàng không được để trống!"),
  toAccount: yup.string().required("Tài khoản ngân hàng không được để trống!"),
  amount: yup.string().required("Số tiền không được để trống!"),
});

export const ReimbursementPromotion = yup.object({
  reimbursementFor: yup.string().required("Hoàn ứng được để trống!"),
  campaign: yup.string().required("Chiến dịch không được để trống!"),
  promotion: yup.string().required("CTKM không được để trống!"),
  amount: yup.string().required("Số tiền không được để trống!"),
});

export const ReimbursementCampaign = yup.object({
  reimbursementFor: yup.string().required("Hoàn ứng được để trống!"),
  campaign: yup.string().required("Chiến dịch không được để trống!"),
  amount: yup.string().required("Số tiền không được để trống!"),
});

export const VoucherManagementSearchForm = yup.object({
  fromDate: yup.date().required("Không được để trống!").nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  toDate: yup
    .date()
    .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
});

export const NewReleaseFormSchema = yup.object({
  fromDate: yup.date().required("Không được để trống!").nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  toDate: yup
    .date()
    .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  releaseCode: yup.string().required("Mã phát hành không được để trống!"),
  releaseName: yup.string().required("Tên phát hành không được để trống!"),
  issuer: yup.string().required("Đơn vị phát hành không được để trống!"),
  releaseType: yup.string().required("Loại phát hành không được để trống!"),
  timesToApply: yup.string().required("Số lần áp dụng không được để trống!"),
  status: yup.string().required("Trạng thái không được để trống!"),
  discountType: yup.string().required("Loại giảm giá không được để trống!"),
  promotionValue: yup.string().required("Giá trị khuyến mãi không được để trống!"),
  receivedAt: yup.string().required("Thời điểm nhận không được để trống!"),
});

export const ScopeApplicationFormSchema = yup.object({
  fromDate: yup.date().required("Không được để trống!").nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  toDate: yup
    .date()
    .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  releaseCode: yup.string().required("Mã phát hành không được để trống!"),
  releaseName: yup.string().required("Tên phát hành không được để trống!"),
  scopeTime: yup.string().required("Phạm vi thời gian không được để trống!"),
  applySystem: yup.string().required("Hệ thống áp dụng không được để trống!"),
  partner: yup.string().required("Đối tác áp dụng không được để trống!"),
});

export const VoucherListFormSchema = yup.object({
  releaseCode: yup.string().required("Mã phát hành không được để trống!"),
  releaseName: yup.string().required("Tên phát hành không được để trống!"),
});

export const CreateGiftFormSchema = yup.object({
  fromDate: yup.date().required("Không được để trống!").nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  toDate: yup
    .date()
    .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  code: yup.string().required("Mã không được để trống!"),
  name: yup.string().required("Tên không được để trống!"),
  quantity: yup.string().required("Số lượng không được để trống!"),
});

export const CreateVoucherCashForm = yup.object({
  rewardMethod: yup.string().required("Loại trả thưởng không được để trống!"),
  quantity: yup.string().required("Số lượng KM không được để trống!"),
  voucher: yup.string().required("Voucher/Cash Back không được để trống!"),
});

export const CreateCashBackForm = yup.object({
  fromDate: yup.date().required("Không được để trống!").nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterCurrentToDate", "", function(value: any) {
      const { path, createError, parent } = this;
      if (parent.toDate && dayjs(parent.toDate).diff(value) < 0) {
        return createError({
          path,
          message: `Từ ngày không được lớn hơn đến ngày!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(value), dayjs(parent.toDate), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  toDate: yup
    .date()
    .required("Không được để trống!")
    .nullable()
    .test("notGreaterCurrent", "", function(value: any) {
      const { path, createError } = this;
      if (value && dayjs(value).diff(dayjs()) > 0) {
        return createError({
          path,
          message: `Không được vượt quá ngày hiện tại!`,
        });
      }

      return true;
    })
    .test("notGreaterThan31Days", "", function(value: any) {
      const { path, createError, parent } = this;
      if (!isWithinNumberDays(dayjs(parent.fromDate), dayjs(value), 7)) {
        return createError({
          path,
          message: `Chỉ được phép tìm kiếm trong 7 ngày!`,
        });
      }

      return true;
    }),
  rewardMethod: yup.string().required("Loại trả thưởng không được để trống!"),
  name: yup.string().required("Tên không được để trống!"),
  code: yup.string().required("Mã KM không được để trống!"),
  type: yup.string().required("Loại KM không được để trống!"),
  promotionValue: yup.string().required("Giá trị khuyến mãi không được để trống!"),
  status: yup.string().required("Trạng thái không được để trống!"),
});

export const AddSingleVoucherForm = yup.object({
  voucherCode: yup.string().required("Mã phát hành không được để trống!"),
});

export const AddListVoucherForm = yup.object({
  quantity: yup.string().required("Số lượng không được để trống!"),
  length: yup.string().required("Độ dài mã được để trống!"),
  prefix: yup.string().required("Prefix không được để trống!"),
});
