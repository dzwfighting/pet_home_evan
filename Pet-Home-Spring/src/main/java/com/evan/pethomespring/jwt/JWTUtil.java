package com.evan.pethomespring.jwt;

import com.evan.pethomespring.model.Roles;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class JWTUtil {
    private static final String SECRET_KEY = "foobar_123456789_foobar_123456789_foobar_123456789_foobar_123456789";

    public String issueToken(String subject, Roles role) {
        return issueToken(subject, role, Collections.emptyMap());
    }

    public String issueToken(String subject, Roles role, String ...scopes) {
//        System.out.println("subject: " + subject + " role: " + role);
        return issueToken(subject, role, Collections.singletonMap("scopes", scopes));
    }
    public String issueToken(String subject, Roles role, List<String> scopes) {
        return issueToken(subject, role, Collections.singletonMap("scopes", scopes));
    }

    public String issueToken(
            String subject,
            Roles role,
            Map<String, Object> claims) {
            Map<String, Object> newClaims = new HashMap<>(claims);
            newClaims.put("role", role.toString());

            String token = Jwts
                    .builder()
                    .setClaims(newClaims)
                    .setSubject(subject)
                    .setIssuer("https://amigoscode.com")
                    .setIssuedAt(Date.from(Instant.now()))
                    .setExpiration(
                            Date.from(Instant.now().plus(15, DAYS))
                    )
                    .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                    .compact();
            System.out.println("JWTUtil subject new: " + subject);
//            System.out.println("issueToken token: " + token);
            return token;
    }

    public String getSubject(String token) {
        String subject = getClaims(token).getSubject();
//        System.out.println("getClaims(token): " + getClaims(token));
//        System.out.println(subject);
        return subject;
    }

    public Claims getClaims(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
//        System.out.println("getClaims token: " + token);
        return claims;
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public boolean isTokenValid(String jwt, String username) {
        String subject = getSubject(jwt);
        return subject.equals(username) && !isTokenExpired(jwt);
    }

    private boolean isTokenExpired(String jwt) {
        Date today = Date.from(Instant.now());
        return getClaims(jwt).getExpiration().before(today);
    }
}
