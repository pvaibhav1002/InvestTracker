package com.examly.springapp.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
 
import com.examly.springapp.model.Investment;
 
@Repository
public interface InvestmentRepo extends JpaRepository<Investment, Long> {
    long count();
    List<Investment> findByStatus(String status);
    List<Investment> findByType(String type);
    boolean existsByName(String name);
    List<Investment> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrTypeContainingIgnoreCase(
            String name, String description, String type);

    @Query("SELECT i.type, COUNT(i) FROM Investment i GROUP BY i.type")
    List<Object[]> countInvestmentsByType();

    @Query("SELECT i.sector, COUNT(i) FROM Investment i GROUP BY i.sector")
    List<Object[]> countInvestmentsBySector();

    @Query("SELECT i.capSize, COUNT(i) FROM Investment i GROUP BY i.capSize")
    List<Object[]> countInvestmentsByCapSize();

    @Query("SELECT i.price FROM Investment i WHERE i.investmentId = :investmentId")
    double findInvestmentPriceById(@Param("investmentId") Long investmentId);

   
}
