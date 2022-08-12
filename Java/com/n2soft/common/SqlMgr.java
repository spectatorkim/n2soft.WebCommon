package com.n2soft.common;

import java.io.StringReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;


/**************************************************************************************************100*/
/*                                                                                                    */
/* Filename : SqlMgr.java                                                                             */
/* Class    : SqlMgr                                                                                  */
/* Function : SqlMgr                                                                                  */
/* Comment  : DB Connection 관련처리모듈                                                              */
/*                                                                                                    */
/*** Maintenance History ******************************************************************************/
/*                                                                                                    */
/* History  : 2009.11.12                                                                              */
/* @author  : 김관중                                                                                  */
/*                                                                                                    */
/******************************************************************************************************/


public class SqlMgr {

    private static String profile = System.getProperty("ntree.profile","");

    private static String db_driver = Env._get(profile, "database.driver", "");
    private static String db_url = Env._get(profile, "database.url", "");
    private static String db_user = Env._get(profile, "database.user", "");
    private static String db_pass = Env._get(profile, "database.pass", "");

    private static boolean db_pooling = System.getProperty("ntree.pooling", Env._get(profile, "database.pooling","")).equalsIgnoreCase("Y");
    private static int db_min_pool = UtilMgr.to_int(System.getProperty("ntree.min_pool", Env._get(profile, "database.min_pool", "2")));
    private static int db_max_pool = UtilMgr.to_int(System.getProperty("ntree.max_pool", Env._get(profile, "database.max_pool", "10")));

    private static boolean debug = true;

    private static volatile SqlMgr instance = null;
    private static DataSource _ds = null;


    private SqlMgr() throws Exception {

        // Load JDBC Driver
        Class.forName(db_driver);

        if( db_pooling ) {

            PoolProperties prop = new PoolProperties();
            prop.setUrl(db_url);
            prop.setDriverClassName(db_driver);
            prop.setUsername(db_user);
            prop.setPassword(db_pass);
            prop.setJmxEnabled(true);
            prop.setTestWhileIdle(true);
            prop.setTestOnBorrow(true);
            prop.setValidationQuery("select 1 from dual");
            prop.setTestOnReturn(false);
            prop.setValidationInterval(30000);
            prop.setTimeBetweenEvictionRunsMillis(30000);
            prop.setInitialSize(db_min_pool);
            prop.setMinIdle(db_min_pool);
            prop.setMaxIdle(db_max_pool);
            prop.setMaxActive(db_max_pool);
            prop.setMaxWait(10000);
            prop.setRemoveAbandonedTimeout(60);
            prop.setMinEvictableIdleTimeMillis(30000);
            prop.setLogAbandoned(true);
            prop.setRemoveAbandoned(true);
            prop.setJdbcInterceptors("org.apache.tomcat.jdbc.pool.interceptor.ConnectionState;" +
                    "org.apache.tomcat.jdbc.pool.interceptor.StatementFinalizer");

            _ds = new DataSource();
            _ds.setPoolProperties(prop);


            if( debug )
                LogMgr.debug("DB Pool Created... (" + db_min_pool + "/" + db_max_pool + ")");
        }
    }

    public static SqlMgr getInstance() throws Exception {

        if( instance == null ) {
            synchronized( SqlMgr.class ) {
                if( instance == null )
                    instance = new SqlMgr();
            }
        }

        return instance;
    }


    // 디버그 모드 설정
    public static void setDebug(boolean _debug) {
        debug = _debug;
    }


    // DB Connection 얻기
    public static Connection getDBConnection() {

        Connection conn = getConnection();

        if( conn == null ) {

            LogMgr.debug("Retrying getConnection()...");
            try { Thread.sleep(100); } catch( Exception e ) {}

            conn = getConnection();
        }

        return conn;
    }


    // DB Connection 얻기
    public static Connection getConnection() {

        Connection conn = null;

        try {
            if( instance == null )
                getInstance();

            if( db_pooling ) {
                conn = _ds.getConnection();
            }
            else {
                if( db_driver.length() == 0 || db_url.length() == 0 )
                    return conn;

                DriverManager.setLoginTimeout(10);
                if( db_user.length() == 0 )
                    conn = DriverManager.getConnection(db_url);
                else
                    conn = DriverManager.getConnection(db_url, db_user, db_pass);
            }

        }
        catch (Exception e) {
            LogMgr.error(e);
        }

        return conn;
    }


    // DB Connection 얻기
    public static Connection getDBConnection(String driver, String url, String user, String pass) {

        Connection conn = null;

        if( driver == null || driver.length() == 0 || url == null || url.length() == 0 )
            return conn;

        try {

            Class.forName(driver);

            if( user == null || user.length() == 0 )
                conn = DriverManager.getConnection(url);
            else
                conn = DriverManager.getConnection(url, user, pass);

        }
        catch (Exception e) {
            LogMgr.error("Exception on getDBConnection(): " + e.getMessage());
        }

        return conn;
    }

    public static void close(Connection conn) {

        try {
            if( conn != null )
                conn.close();
        }
        catch( SQLException e ) {
        }
    }


    // 단순 쿼리
    public static boolean doQuery(String sql) {
        return doQuery((Connection)null, sql);
    }

    // 단순 쿼리
    public static boolean doQuery(Connection conn, String sql) {
        PreparedStatement stmt = null;
        boolean is_ok = true;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at doQuery(): [ " + sql + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareStatement(sql);

            stmt.executeUpdate();

        }
        catch( Exception e ) {
            LogMgr.error("Exception at doQuery(): " + e.getMessage());
            is_ok = false;
        }
        finally {
            if( stmt != null ) try { stmt.close(); } catch(SQLException e) {}
            if( is_new && conn != null ) try { conn.close(); } catch(SQLException e) {}
        }

        return is_ok;
    }//end doQuery



    // 가변인수 쿼리
    public static boolean doQuery(String sql, String...args) {
        return doQuery((Connection)null, sql, args);
    }

    public static boolean doQuery(String sql, StringList data) {
        return doQuery((Connection)null, sql, data);
    }

    public static boolean doQuery(Connection conn, String sql, StringList data) {
        String[] args = new String[data.size()];
        data.toArray(args);

        return doQuery(conn, sql, args);
    }

    public static boolean doQuery(Connection conn, String sql, String...args) {
        PreparedStatement stmt = null;
        boolean is_ok = true;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at doQuery(): [ " + sql + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareStatement(sql);

            for(int i=0; i < args.length; i++) {

                if( debug )
                    LogMgr.debug("SqlMgr - Args of doQuery(): [" + i + "]: [" + args[i] + "]");

                if( UtilMgr.length(args[i]) > 2000 )
                    stmt.setCharacterStream(i+1, new StringReader(args[i]), UtilMgr.length(args[i]));
                else
                    stmt.setString(i+1, args[i]);
            }

            stmt.executeUpdate();

        } catch(Exception ex) {
            LogMgr.error("Exception at doQuery(): "+ex);
            is_ok = false;
        } finally {
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        return is_ok;
    }//end doQuery

    public static boolean doQuerys(Connection conn, String sql, String divisor) {
        PreparedStatement stmt = null;
        boolean is_ok = true;
        boolean is_new = true;

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            String[] query = UtilMgr.split(sql, divisor);

            for(int i=0; i < query.length; i++) {
                query[i] = query[i].trim();

                if( query[i].length() > 0 ) {

                    if( debug )
                        LogMgr.debug("Sqls of doQuery()==[" + i + "]: [" + query[i] + "]");

                    stmt = conn.prepareStatement(query[i]);
                    stmt.executeUpdate();
                    if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
                }
            }

        } catch(Exception ex) {
            LogMgr.error("Exception at doQuery(): "+ex);
            is_ok = false;
        } finally {
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        return is_ok;
    }



    // 가변인수 쿼리
    public static boolean doBatchQuery(String sql, String...args) {
        return doBatchQuery((Connection)null, sql, args);
    }

    public static boolean doBatchQuery(String sql, StringList data) {
        return doBatchQuery((Connection)null, sql, data);
    }

    public static boolean doBatchQuery(Connection conn, String sql, StringList data) {
        String[] args = new String[data.size()];
        data.toArray(args);

        return doBatchQuery(conn, sql, args);
    }

    public static boolean doBatchQuery(Connection conn, String sql, String...args) {
        PreparedStatement stmt = null;
        boolean is_ok = true;
        boolean is_new = true;
        StringBuffer sb_log = new StringBuffer();

        if( debug )
            sb_log.append("Sql at doBatchQuery(): [ ").append(sql).append(" ]\n");

        int cols = new StringTokenizer(sql, "?").countTokens() - 1;
        int rows = args.length / cols;

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareStatement(sql);

            for(int i=0; i < rows; i++) {

                for(int j=0; j < cols; j++) {
                    int index = i*cols + j;

                    if( args[index] == null )
                        args[index] = "";

                    if( debug )
                        sb_log.append("[").append(i).append("][").append(j).append("]: [").append(args[index]).append("]\n");

                    if( UtilMgr.length(args[index]) > 2000 )
                        stmt.setCharacterStream(j+1, new StringReader(args[index]), UtilMgr.length(args[index]));
                    else
                        stmt.setString(j+1, args[index]);
                }

                stmt.addBatch();
            }

            if( debug )
                LogMgr.debug(sb_log.toString());

            stmt.executeBatch();

        } catch(Exception ex) {
            LogMgr.error("Exception at doBatchQuery(): "+ex);
            is_ok = false;
        } finally {
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }


        return is_ok;
    }//end doBatchQuery



    // 단일값 리턴
    public static String getFieldOne(String sql) {
        return getFieldOne((Connection)null, sql);
    }

    public static String getFieldOne(Connection conn, String sql) {
        Statement stmt = null;
        ResultSet rs = null;
        String result = null;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at getFieldOne(): [ " +sql + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            if (rs.next()) result = rs.getString(1);
        } catch(Exception ex) {
            LogMgr.error("Exception at getFieldOne(): "+ex);
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        return result;
    }


    // 단일값 리턴(가변인수)
    public static String getFieldOne(String sql, String...args) {
        return getFieldOne((Connection)null, sql, args);
    }

    public static String getFieldOne(Connection conn, String sql, String...args) {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String result = null;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at getFieldOne(): [ " +sql + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareStatement(sql);

            for(int i=0; i < args.length; i++) {

                if( debug )
                    LogMgr.debug("Args of getFieldOne(): [" + i + "]: [" + args[i] + "]");

                stmt.setString(i+1, args[i]);
            }

            rs = stmt.executeQuery();

            if( rs.next() )
                result = rs.getString(1);

        } catch(Exception ex) {
            LogMgr.error("Exception at getFieldOne(): "+ex);
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        return result;
    }



    // 단일 int 값 리턴
    public static int getFieldOneInt(String sql) {
        return getFieldOneInt((Connection)null, sql);
    }

    public static int getFieldOneInt(Connection conn, String sql) {
        Statement stmt = null;
        ResultSet rs = null;
        int result = 0;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at getFieldOneInt(): [" + sql + "]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            if (rs.next())
                result = rs.getInt(1);

        } catch(Exception ex) {
            LogMgr.error("Exception at getFieldOneInt(): " + ex.getMessage());
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        return result;
    }


    // 단일 int값 리턴(가변인수)
    public static int getFieldOneInt(String sql, String...args) {
        return getFieldOneInt((Connection)null, sql, args);
    }

    public static int getFieldOneInt(Connection conn, String sql, String...args) {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        int result = 0;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at getFieldOneInt(): [ " +sql + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareStatement(sql);

            for(int i=0; i < args.length; i++) {

                if( debug )
                    LogMgr.debug("Args of getFieldOneInt(): [" + i + "]: [" + args[i] + "]");

                stmt.setString(i+1, args[i]);
            }

            rs = stmt.executeQuery();

            if( rs.next() )
                result = rs.getInt(1);

        } catch(Exception ex) {
            LogMgr.error("Exception at getFieldOne(): "+ex);
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        return result;
    }


    // 복수 스트링값 리턴
    public static String[] getFieldList(String sql) {
        return getFieldList((Connection)null, sql);
    }

    public static String[] getFieldList(Connection conn, String sql) {
        Statement stmt = null;
        ResultSet rs = null;
        ResultSetMetaData meta = null;
        StringList list = new StringList();
        int nfield = 0;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at getFieldList(): [ " + sql + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);

            meta = rs.getMetaData();
            nfield = meta.getColumnCount();

            String[] metadata = new String[nfield];
            for(int i=0; i < nfield; i++)
                metadata[i] = meta.getColumnName(i+1);

            while( rs.next() ) {
                for(int i=1; i <= nfield; i++)
                    list.add(rs.getString(i));
            }
        } catch(Exception ex) {
            LogMgr.error("Exception at getFieldList(): "+ex);
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        String[] token = new String[list.size()];
        list.toArray(token);

        return token;
    }



    // 복수 스트링값 리턴
    public static String[] getFieldList(String sql, String...args) {
        return getFieldList((Connection)null, sql, args);
    }

    public static String[] getFieldList(Connection conn, String sql, String...args) {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ResultSetMetaData meta = null;
        StringList list = new StringList();
        int nfield = 0;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at getFieldList(): [ " + sql + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareStatement(sql);

            for(int i=0; i < args.length; i++) {

                if( debug )
                    LogMgr.debug("Args of getFieldList(): [" + i + "]: [" + args[i] + "]");

                stmt.setString(i+1, args[i]);
            }

            rs = stmt.executeQuery();

            meta = rs.getMetaData();
            nfield = meta.getColumnCount();   

            String[] metadata = new String[nfield];
            for(int i=0; i < nfield; i++)
                metadata[i] = meta.getColumnName(i+1);

            while( rs.next() ) {
                for(int i=1; i <= nfield; i++)
                    list.add(rs.getString(i));
            }

        } catch(Exception ex) {
            LogMgr.error("Exception at getFieldList(): "+ex);
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        String[] token = new String[list.size()];
        list.toArray(token);

        return token;
    }//end getFieldList


    // 결과를 Map으로 리턴
    public static StringMap getFieldMap(String sql) {
        return getFieldMap((Connection)null, sql, true);
    }

    public static StringMap getFieldMap(Connection conn, String sql) {
        return getFieldMap(conn, sql, true);
    }

    public static StringMap getFieldMap(String sql, boolean b_meta_uppercase) {
        return getFieldMap((Connection)null, sql, b_meta_uppercase);
    }

    public static StringMap getFieldMap(Connection conn, String sql, boolean b_meta_uppercase) {
        Statement stmt = null;
        ResultSet rs = null;
        ResultSetMetaData meta = null;
        StringMap retData = new StringMap();
        int nfield = 0;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at getFieldMap(): [ " + sql + " ]");

        try {
            if( conn == null)
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);

            meta = rs.getMetaData();
            nfield = meta.getColumnCount();

            String[] metadata = new String[nfield];
            for(int i=0; i < nfield; i++)
                metadata[i] = b_meta_uppercase ? meta.getColumnName(i+1).toUpperCase() : meta.getColumnName(i+1).toLowerCase();

                int i = 0;

                for(; rs.next(); i++) {
                    for(int j=0; j < nfield; j++) {
                        String data = rs.getString(j+1);
                        if( data == null )
                            data = "";
                        retData.put(metadata[j] + ((i > 0) ? "[" + i + "]" : ""), data);
                    }
                }

                retData.put("count", i);

        } catch(Exception ex) { 
            LogMgr.error("Exception at getFieldMap(): " + ex.getMessage());
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }



        return retData;
    }


    public static StringMap getFieldMap(String sql, boolean b_meta_uppercase, String...args) {
        return getFieldMap((Connection)null, sql, b_meta_uppercase, args);
    }

    public static StringMap getFieldMap(String sql, String...args) {
        return getFieldMap((Connection)null, sql, true, args);
    }

    public static StringMap getFieldMap(Connection conn, String sql, String...args) {
        return getFieldMap(conn, sql, true, args);
    }

    public static StringMap getFieldMap(Connection conn, String sql, boolean b_meta_uppercase, String...args) {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ResultSetMetaData meta = null;
        StringMap retData = new StringMap();
        int nfield = 0;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at getFieldMap(): [ " + sql + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareStatement(sql);

            for(int i=0; args != null && i < args.length; i++) {

                if( debug )
                    LogMgr.debug("Args of getFieldMap(): [" + i + "]: [" + args[i] + "]");

                stmt.setString(i+1, args[i]);
            }
            rs = stmt.executeQuery();

            meta = rs.getMetaData();
            nfield = meta.getColumnCount();

            String[] metadata = new String[nfield];
            for(int i=0; i < nfield; i++)
                metadata[i] = b_meta_uppercase ? meta.getColumnName(i+1).toUpperCase() : meta.getColumnName(i+1).toLowerCase();

                int i = 0;

                for(; rs.next(); i++) {
                    for(int j=0; j < nfield; j++) {
                        String data = rs.getString(j+1);
                        if( data == null )
                            data = "";
                        retData.put(metadata[j] + ((i > 0) ? "[" + i + "]" : ""), data);
                    }
                }

                retData.put("count", i);

        } catch(Exception ex) { 
            LogMgr.error(ex);
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }



        return retData;
    }//end getFieldMap




    // 결과를 그룹별 맵으로 리턴
    public static StringMap getGroupMap(String sql, String...args) {
        return getGroupMap((Connection)null, sql, null, false, args);
    }

    public static StringMap getGroupMap(Connection conn, String sql, String...args) {
        return getGroupMap(conn, sql, null, false, args);
    }

    public static StringMap getGroupMap(String sql, boolean b_uppercase, String...args) {
        return getGroupMap((Connection)null, sql, null, b_uppercase, args);
    }

    public static StringMap getGroupMap(Connection conn, String sql, boolean b_uppercase, String...args) {
        return getGroupMap(conn, sql, null, b_uppercase, args);
    }

    public static StringMap getGroupMap(String sql, String group, boolean b_uppercase, String...args) {
        return getGroupMap((Connection)null, sql, group, b_uppercase, args);
    }

    public static StringMap getGroupMap(Connection conn, String sql, String group, boolean b_uppercase, String...args) {

        PreparedStatement stmt = null;
        ResultSet rs = null;
        ResultSetMetaData meta = null;
        StringMap retData = new StringMap();
        int nfield = 0;
        boolean is_new = true;

        if( group == null )
            group = "";

        if( debug )
            LogMgr.debug("Sql at getGroupMap(): [" + group + "][ " + sql + " ]");

        if( group.length() > 0 )
            group += ".";

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareStatement(sql);

            for(int i=0; args != null && i < args.length; i++) {
                if( debug )
                    LogMgr.debug("Args of getGroupMap(): [" + i + "]: [" + args[i] + "]");
                stmt.setString(i+1, args[i]);
            }
            rs = stmt.executeQuery();

            meta = rs.getMetaData();
            nfield = meta.getColumnCount();

            String[] metadata = new String[nfield];
            for(int i=0; i < nfield; i++)
                metadata[i] = b_uppercase ? meta.getColumnName(i+1).toUpperCase() : meta.getColumnName(i+1).toLowerCase();

            int i = 0;

            for(; rs.next(); i++) {
                for(int j=0; j < nfield; j++) {
                    String data = rs.getString(j+1);
                    if( data == null )
                        data = "";
                    retData.put(group + metadata[j] + "[" + i + "]", data);
                }
            }

            retData.put(group + "count", i);

        } catch(Exception ex) { 
            LogMgr.error(ex);
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }



        return retData;
    }//end getGroupMap





    // 결과를 DataMap으로 리턴 (Mybatis 호환)
    public static DataMap selectOne(String sql, String...args) {
        return selectOne((Connection)null, sql, true, args);
    }

    public static DataMap selectOne(Connection conn, String sql, String...args) {
        return selectOne(conn, sql, true, args);
    }

    public static DataMap selectOne(String sql, boolean b_meta_uppercase, String...args) {
        return selectOne((Connection)null, sql, b_meta_uppercase, args);
    }

    public static DataMap selectOne(Connection conn, String sql, boolean b_meta_uppercase, String...args) {
        PreparedStatement stmt = null;
        ResultSet rs = null;
        ResultSetMetaData meta = null;
        DataMap retData = new DataMap();
        int nfield = 0;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at selectOne(): [ " + sql + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareStatement(sql);

            for(int i=0; args != null && i < args.length; i++) {

                if( debug )
                    LogMgr.debug("Args of selectOne(): [" + i + "]: [" + args[i] + "]");

                stmt.setString(i+1, args[i]);
            }
            rs = stmt.executeQuery();

            meta = rs.getMetaData();
            nfield = meta.getColumnCount();

            String[] metadata = new String[nfield];
            for(int i=0; i < nfield; i++)
                metadata[i] = b_meta_uppercase ? meta.getColumnName(i+1).toUpperCase() : meta.getColumnName(i+1).toLowerCase();

            if( rs.next() ) {
                for(int i=0; i < nfield; i++) {
                    Object data = rs.getObject(i+1);
                    if( data == null )
                        data = "";
                    retData.put(metadata[i], data);
                }
            }

        } catch(Exception ex) { 
            LogMgr.error(ex);
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }



        return retData;
    }



    // 결과를 DataMapList로 리턴 (Mybatis 호환)
    public static DataMapList selectList(String sql, String...args) {
        return selectList((Connection)null, sql, false, args);
    }

    public static DataMapList selectList(Connection conn, String sql, String...args) {
        return selectList(conn, sql, false, args);
    }

    public static DataMapList selectList(String sql, boolean b_uppercase, String...args) {
        return selectList((Connection)null, sql, b_uppercase, args);
    }

    public static DataMapList selectList(Connection conn, String sql, boolean b_uppercase, String...args) {

        PreparedStatement stmt = null;
        ResultSet rs = null;
        ResultSetMetaData meta = null;
        DataMapList retData = new DataMapList();
        int nfield = 0;
        boolean is_new = true;

        if( debug )
            LogMgr.debug("Sql at selectList(): [ " + sql + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareStatement(sql);

            for(int i=0; i < args.length; i++) {
                if( debug )
                    LogMgr.debug("Args of selectList(): [" + i + "]: [" + args[i] + "]");
                stmt.setString(i+1, args[i]);
            }

            rs = stmt.executeQuery();

            meta = rs.getMetaData();
            nfield = meta.getColumnCount();

            String[] metadata = new String[nfield];
            for(int i=0; i < nfield; i++)
                metadata[i] = b_uppercase ? meta.getColumnName(i+1).toUpperCase() : meta.getColumnName(i+1).toLowerCase();

            while( rs.next() ) {
            	DataMap dm = new DataMap();
                for(int i=0; i < nfield; i++) {
                    Object data = rs.getObject(i+1);
                    if( data == null )
                        data = "";
                    dm.put(metadata[i], data);
                }
                retData.add(dm);
            }

        } catch(Exception ex) { 
            LogMgr.error(ex);
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }



        return retData;
    }



	public static List<Map<String, String>> getMapList(String sql) {
		Statement stmt = null;
		ResultSet rs = null;
		ResultSetMetaData meta = null;
		List<Map<String, String>> retData = new ArrayList<Map<String, String>>();
		int nfield = 0;
		Connection conn = null;
		
		if( debug )
			LogMgr.debug("Sql at getMapList(): [ " + sql + " ]");

		try {
			conn = getDBConnection();

			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);

			meta = rs.getMetaData();
			nfield = meta.getColumnCount();

			String[] metadata = new String[nfield];
			for(int i=0; i < nfield; i++)
				metadata[i] = meta.getColumnName(i+1).toUpperCase();

			while(rs.next()) {
				Map<String, String> map = new HashMap<String, String>();

				for(int i=0; i < nfield; i++) {
					String data = rs.getString(metadata[i]);
					if( data == null )
						data = "";
					map.put(metadata[i], data);
				}

				retData.add(map);
			}

		} catch(Exception ex) { 
			LogMgr.error(ex);
		} finally {
			if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
			if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
			if (conn != null) try { conn.close(); } catch(SQLException ex1) {}
		}

		return retData;
	}



	// 프로시저 실행
    public static boolean doCall(String sp_name, String...args) {
        return doCall((Connection)null, sp_name, args);
    }

    public static boolean doCall(Connection conn, String sp_name, String...args) {
        CallableStatement stmt = null;
        boolean is_ok = true;
        boolean is_new = true;

        String sql = "{ call " + sp_name + "(";

        for(int i=0; i < args.length; i++)
            sql += (i > 0) ? ",?" : "?";

        sql += ") }";


        if( debug )
            LogMgr.debug("Sql at doCall(): [ " + sp_name + " " + Arrays.toString(args) + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareCall(sql);

            for(int i=0; i < args.length; i++)
                stmt.setString(i+1, args[i]);

            stmt.execute();

        } catch(Exception ex) {
            LogMgr.error("Exception at doCall(): "+ex);
            is_ok = false;
        } finally {
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        return is_ok;
    }


    // 프로시저 실행
    public static String[] doCall(String sp_name, int nout, String...args) {
        return doCall((Connection)null, sp_name, nout, args);
    }

    public static String[] doCall(Connection conn, String sp_name, int nout, String...args) {
        CallableStatement stmt = null;
        String[] out = new String[nout];
        boolean is_new = true;

        String sql = "{ call " + sp_name + "(";

        for(int i=0; i < args.length + nout; i++)
            sql += (i > 0) ? ",?" : "?";

        sql += ") }";


        if( debug )
            LogMgr.debug("Sql at doCall(): [ " + sp_name + " " + Arrays.toString(args) + " (" + nout + ") ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareCall(sql);
            int i = 0;

            for(; i < args.length; i++)
                stmt.setString(i+1, args[i]);

            for(int j=0; j < nout; j++)
                stmt.registerOutParameter(i+j+1, java.sql.Types.VARCHAR);

            stmt.execute();

            for(int j=0; j < nout; j++)
                out[j] = stmt.getString(args.length + j + 1);

        } catch(Exception ex) {
            LogMgr.error("Exception at doCall(): " + ex.getMessage());
            out = null;
        } finally {
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        return out;
    }//end doCall


    // 프로시저 실행
    public static String[] getCall(String sp_name, String...args) {
        return getCall((Connection)null, sp_name, args);
    }

    public static String[] getCall(Connection conn, String sp_name, String...args) {
        CallableStatement stmt = null;
        boolean is_new = true;

        String sql = "{ call " + sp_name + "(";

        for(int i=0; i < args.length; i++)
            sql += (i > 0) ? ",?" : "?";

        sql += ") }";


        if( debug )
            LogMgr.debug("Sql at getCall(): [ " + sp_name + " " + Arrays.toString(args) + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareCall(sql);
            for(int i=0; i < args.length; i++) {
                stmt.setString(i+1, args[i]);
                stmt.registerOutParameter(i+1, java.sql.Types.VARCHAR);
            }

            stmt.execute();

            for(int i=0; i < args.length; i++)
                args[i] = stmt.getString(i+1);

        } catch(Exception ex) {
            LogMgr.error("Exception at getCall(): " + ex.getMessage());
            args = null;
        } finally {
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        return args;
    }//end getCall



    // 프로시저 실행
    public static String[] getCallList(String fn_name, String...args) {
        return getCallList((Connection)null, fn_name, args);
    }

    public static String[] getCallList(Connection conn, String fn_name, String...args) {
        CallableStatement stmt = null;
        ResultSet rs = null;
        ResultSetMetaData meta = null;
        StringList list = new StringList();
        int nfield = 0;
        boolean is_new = true;

        String sql = "{ ? = call " + fn_name + "(";

        for(int i=0; i < args.length; i++)
            sql += (i > 0) ? ",?" : "?";

        sql += ") }";


        if( debug )
            LogMgr.debug("Sql at getCallList(): [ " + fn_name + " " + Arrays.toString(args) + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareCall(sql);

            stmt.registerOutParameter(1, -10);        // OracleTypes.CURSOR

            for(int i=0; i < args.length; i++)
                stmt.setString(i+2, args[i]);

            stmt.execute();
            rs = (ResultSet)stmt.getObject(args.length+1);

            meta = rs.getMetaData();
            nfield = meta.getColumnCount();   

            String[] metadata = new String[nfield];
            for(int i=0; i < nfield; i++)
                metadata[i] = meta.getColumnName(i+1);
    

            while( rs.next() ) {
                for(int i=1; i <= nfield; i++)
                    list.add(rs.getString(i));
            }

        } catch(Exception ex) {
            LogMgr.error("Exception at getCallList(): " + ex.getMessage());
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }



        String[] token = new String[list.size()];
        list.toArray(token);

        return token;
    }



    // 프로시저 실행
    public static StringMap getCallMap(String fn_name, String...args) {
        return getCallMap((Connection)null, fn_name, args);
    }

    public static StringMap getCallMap(Connection conn, String fn_name, String...args) {
        CallableStatement stmt = null;
        ResultSet rs = null;
        ResultSetMetaData meta = null;
        StringMap retData = new StringMap();
        int nfield = 0;
        boolean is_new = true;

        String sql = "{ ? = call " + fn_name + "(";

        for(int i=0; i < args.length; i++)
            sql += (i > 0) ? ",?" : "?";

        sql += ") }";


        if( debug )
            LogMgr.debug("Sql at getCallMap(): [ " + fn_name + " " + Arrays.toString(args) + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareCall(sql);

            stmt.registerOutParameter(1, -10);        // OracleTypes.CURSOR
            for(int i=0; i < args.length; i++)
                stmt.setString(i+2, args[i]);

            stmt.execute();

            rs = (ResultSet)stmt.getObject(1);

            meta = rs.getMetaData();
            nfield = meta.getColumnCount();   

            String[] metadata = new String[nfield];
            for(int i=0; i < nfield; i++)
                metadata[i] = meta.getColumnName(i+1);
    


            int i = 0;
            for(; rs.next(); i++) {
                for(int j=0; j < nfield; j++) {
                    String data = rs.getString(j+1);
                    if( data == null )
                        data = "";
                    retData.put(metadata[j] + ((i > 0) ? "[" + i + "]" : ""), data);
                }
            }
            retData.put("count", i);

        } catch(Exception ex) {
            LogMgr.error("Exception at getCallMap(): " + ex.getMessage());
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        return retData;
    }


    // 프로시저 실행
    public static StringMap getCallGroupMap(String fn_name, String group, String...args) {
        return getCallGroupMap((Connection)null, fn_name, group, args);
    }

    public static StringMap getCallGroupMap(Connection conn, String fn_name, String group, String...args) {
        CallableStatement stmt = null;
        ResultSet rs = null;
        ResultSetMetaData meta = null;
        StringMap retData = new StringMap();
        int nfield = 0;
        boolean is_new = true;


        if( group == null )
            group = "";

        String sql = "{ ? = call " + fn_name + "(";

        for(int i=0; i < args.length; i++)
            sql += (i > 0) ? ",?" : "?";

        sql += ") }";


        if( debug )
            LogMgr.debug("Sql at getCallGroupMap(): [" + group + "][ " + fn_name + " " + Arrays.toString(args) + " ]");

        try {
            if( conn == null )
                conn = getDBConnection();
            else
                is_new = false;

            stmt = conn.prepareCall(sql);

            stmt.registerOutParameter(1, -10);        // OracleTypes.CURSOR

            for(int i=0; i < args.length; i++)
                stmt.setString(i+2, args[i]);

            stmt.execute();

            rs = (ResultSet)stmt.getObject(1);

            meta = rs.getMetaData();
            nfield = meta.getColumnCount();   

            String[] metadata = new String[nfield];
            for(int i=0; i < nfield; i++)
                metadata[i] = meta.getColumnName(i+1);

            int i = 0;

            if( group.length() > 0 )
                group += ".";

            for(; rs.next(); i++) {
                for(int j=0; j < nfield; j++) {
                    String data = rs.getString(j+1);
                    if( data == null )
                        data = "";
                    retData.put(group + metadata[j] + "[" + i + "]", data);
                }
            }
            retData.put(group + "count", i);

            if( debug )
                LogMgr.debug(retData.toString());

        } catch(Exception ex) {
            LogMgr.error("Exception at getCallGroupMap(): " + ex.getMessage());
        } finally {
            if (rs != null) try { rs.close(); } catch(SQLException ex1) {}
            if (stmt != null) try { stmt.close(); } catch(SQLException ex1) {}
            if (is_new && conn != null) try { conn.close(); } catch(SQLException ex1) {}
        }

        return retData;
    }


}
