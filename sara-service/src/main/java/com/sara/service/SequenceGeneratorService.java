package com.sara.service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.text.DecimalFormat;
import java.text.Format;
import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.sara.data.document.DatabaseSequence;

@Service
public class SequenceGeneratorService {

	private static final Logger log = LoggerFactory.getLogger(SequenceGeneratorService.class);

	private MongoOperations mongoOperations;

	@Autowired
	public SequenceGeneratorService(MongoOperations mongoOperations) {
		this.mongoOperations = mongoOperations;
	}

	public String nextSeq( String seqName) {
		return nextSeq(null, seqName);
	}

	public String nextSeq(String prefix, String seqName) {
//		Format fmt = new SimpleDateFormat("yyyyMMdd");
		Format fmtNum = new DecimalFormat("#########################################00000000");
//		String prefix = fmt.format(new Date());

		 String _seq = seqName;
		if(!StringUtils.isBlank(prefix)) {
			_seq = prefix + "_" + seqName;
		}
		long seq = 0;
		synchronized (_seq) {
			DatabaseSequence counter = mongoOperations.findAndModify(query(where("_id").is(_seq)),
					new Update().inc("seq", 1), options().returnNew(true).upsert(true), DatabaseSequence.class);
			seq = !Objects.isNull(counter) ? counter.getSeq() : 1;
		}
		String nextSeq = "" + seq;
		if(!StringUtils.isBlank(prefix)) {
			nextSeq = prefix + "-" + fmtNum.format(seq);
		}
		
		log.info("_seq={}, nextSeq==>{}", _seq, nextSeq);
		return nextSeq;

	}
}
