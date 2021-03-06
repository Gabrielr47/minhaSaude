package io.minhasaude.msapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.minhasaude.msapi.model.Cirurgia;
import io.minhasaude.msapi.model.Paciente;

public interface CirurgiaRepository extends JpaRepository<Cirurgia, Long> {

	List<Cirurgia> findByPaciente(Paciente paciente);
}
