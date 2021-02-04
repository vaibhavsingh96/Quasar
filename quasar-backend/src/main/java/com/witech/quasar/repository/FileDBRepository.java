package com.witech.quasar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.witech.quasar.model.FileDB;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {

}
