package com.n2soft.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Level;


/**
 * Log 기록을 대행하는 클래스이다. 
 *
 */

public class LogMgr {

	public static void log(Level level, String msg) {
        try {
    		StackTraceElement ste = new Throwable().getStackTrace()[2];
    		Logger logger = LoggerFactory.getLogger (ste.getClassName() + "." + ste.getMethodName());

    		if( logger != null ) {
            	if( level == Level.DEBUG )
            		logger.debug(msg);
            	else if( level == Level.ERROR )
            		logger.error(msg);
            	else if( level == Level.INFO )
            		logger.info(msg);
            	else if( level == Level.TRACE )
            		logger.trace(msg);
            	else if( level == Level.WARN )
            		logger.warn(msg);
            }
        }
        catch( Exception e ) {
            System.err.println(UtilMgr.getStackTraceFromThrowable(e));
        }
    }

    public static void debug(String msg) {
		log(Level.DEBUG, msg);
	}

    public static void debug(Object...list) {
		log(Level.DEBUG, _merge(list));
	}


    public static void info(String msg) {
		log(Level.INFO, msg);
	}

    public static void info(Object...list) {
		log(Level.INFO, _merge(list));
	}


    public static void warn(String msg) {
        log(Level.WARN, msg);
    }

    public static void warn(Object...list) {
		log(Level.WARN, _merge(list));
	}


    public static void trace(String msg) {
        log(Level.TRACE, msg);
    }

    public static void trace(Object...list) {
		log(Level.TRACE, _merge(list));
	}


    public static void error(String msg) {
		log(Level.ERROR, msg);
	}

    public static void error(Throwable t) {
		log(Level.ERROR, UtilMgr.getStackTraceFromThrowable(t));
	}

	public static void error(String msg, Throwable t) {
		log(Level.ERROR, msg + UtilMgr.getStackTraceFromThrowable(t));
	}

    public static void error(Object...list) {
		log(Level.ERROR, _merge(list));
	}


	private static String _merge(Object...list) {
		StringBuffer sb = new StringBuffer();

		for( Object s : list )
			sb.append(s);

		return sb.toString();
	}

}
