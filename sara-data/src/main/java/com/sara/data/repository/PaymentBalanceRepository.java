package com.sara.data.repository;

import java.util.List;

import com.sara.data.document.CodeGroups;
import com.sara.data.document.PaymentBalance;
import com.sara.data.document.Student;

public interface PaymentBalanceRepository extends CustomRepository<PaymentBalance, String> {

	List<PaymentBalance> findByStudentAndPeriodOrderByOrder(Student student, CodeGroups period);

}
